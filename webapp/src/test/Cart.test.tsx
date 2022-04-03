import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import { CartProduct } from "../shared/shareddtypes";
import Cart from "../components/Cart";

test('Cart without items renders properly', async () => {
    const products: CartProduct[] = [];

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Cart cartItems={products} addToCart={() => undefined} removeFromCart={() => undefined} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/cartTitle/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/No items in cart/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Subtotal: \$/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Total: \$/i);
    expect(linkElement).toBeInTheDocument();
    let linkElements = screen.getAllByText(/0.00/i);
    expect(linkElements.length).toEqual(2);
    linkElement = screen.getByText(/Proceed to checkout/i);
    expect(linkElement).toBeInTheDocument();
});

test('Cart with items renders properly', async () => {
    const products: CartProduct[] = [
        { name: "NombrePrueba1", description: "DescripcionPrueba1", price: 1.00, category: "CategoriaPrueba1", urlPhoto: "urlPrueba1", amount: 2 },
        { name: "NombrePrueba2", description: "DescripcionPrueba2", price: 2.00, category: "CategoriaPrueba2", urlPhoto: "urlPrueba2", amount: 2 },
    ];

    render(
        <React.StrictMode>
            <UserState>
                <LangState>
                    <Cart cartItems={products} addToCart={() => undefined} removeFromCart={() => undefined} />
                </LangState>
            </UserState>
        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/cartTitle/i);
    expect(linkElement).toBeInTheDocument();

    let linkElements = screen.getAllByText(/Price:/i);
    expect(linkElements.length).toEqual(2);
    linkElements = screen.getAllByText(/: \$/i);
    expect(linkElements.length).toEqual(8);
    linkElements = screen.getAllByText(/Subtotal: /i);
    expect(linkElements.length).toEqual(3);

    linkElement = screen.getByText(/NombrePrueba1/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/2.00/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/2.42/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/NombrePrueba2/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/4.00/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/4.84/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/6.00/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Proceed to checkout/i);
    expect(linkElement).toBeInTheDocument();
});