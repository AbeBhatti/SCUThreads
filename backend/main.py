from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
import stripe
from dotenv import load_dotenv
import os
from authlib.integrations.starlette_client import OAuth
import urllib.parse

# ----------------------------
# Load environment variables first
# ----------------------------
load_dotenv()

print("FRONTEND_URL =", os.getenv("FRONTEND_URL"))
print("BACKEND_URL =", os.getenv("BACKEND_URL"))
print("GOOGLE_CLIENT_ID =", os.getenv("GOOGLE_CLIENT_ID") is not None)
print("GOOGLE_CLIENT_SECRET =", os.getenv("GOOGLE_CLIENT_SECRET") is not None)
print("STRIPE_SECRET_KEY =", os.getenv("STRIPE_SECRET_KEY") is not None)

# ----------------------------
# FastAPI app
# ----------------------------
app = FastAPI()

# ----------------------------
# Middleware
# ----------------------------
# Session middleware for OAuth
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY", "supersecret123")
)

# CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://scuthreads.vercel.app")
origins = [FRONTEND_URL]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Routes
# ----------------------------
@app.get("/")
def root():
    return {"message": "SCUThreads backend running!"}

@app.get("/env-check")
def env_check():
    return {
        "frontend": bool(os.getenv("FRONTEND_URL")),
        "backend": bool(os.getenv("BACKEND_URL")),
        "google_id": bool(os.getenv("GOOGLE_CLIENT_ID")),
        "google_secret": bool(os.getenv("GOOGLE_CLIENT_SECRET")),
        "stripe": bool(os.getenv("STRIPE_SECRET_KEY")),
        "session_key": bool(os.getenv("SESSION_SECRET_KEY"))
    }

# Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()
    try:
        line_items = [{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": item["name"]},
                "unit_amount": int(item["price"] * 100),
            },
            "quantity": item["quantity"],
        } for item in data["cart"]]

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=f"{FRONTEND_URL}/success",
            cancel_url=f"{FRONTEND_URL}/cancel",
        )

        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Google OAuth
oauth = OAuth()
oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

@app.get("/auth/google")
async def login(request: Request):
    redirect_uri = f"{os.getenv('BACKEND_URL')}/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/google/callback")
async def auth_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)

    # enforce SCU email
    email = user_info.get("email")
    if not email or not email.endswith("@scu.edu"):
        raise HTTPException(status_code=403, detail="Only SCU emails are allowed")

    # redirect to frontend with user info
    params = urllib.parse.urlencode({"email": email, "name": user_info.get("name")})
    return RedirectResponse(f"{FRONTEND_URL}/login-success?{params}")

# ----------------------------
# Uvicorn entrypoint for Render
# ----------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
