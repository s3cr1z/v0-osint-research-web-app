import { stripe } from "@/lib/stripe"
import { CREDIT_PACKAGES } from "@/lib/products"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId } = body

    const product = CREDIT_PACKAGES.find((p) => p.id === productId)
    if (!product) {
      throw new Error(`Product with id "${productId}" not found`)
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error("Checkout error:", error)
    return Response.json({ error: "Checkout failed" }, { status: 500 })
  }
}
