from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import stripe
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.get("/")
def root():
    return {"message": "SCUCloset backend running!"}

@app.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()
    try:
        line_items = []
        for item in data["cart"]:
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": item["name"]},
                    "unit_amount": int(item["price"] * 100),
                },
                "quantity": item["quantity"],
            })

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )

        return {"url": session.url}  # << important, this is what frontend uses

    except Exception as e:
        return {"error": str(e)}
