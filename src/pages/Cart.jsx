import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Button, Image } from "antd"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"


function Cart() {

    const {cartItems , removeItemFromCart , addItemToCart , lessQuantityFromCart} = useContext(CartContext)

    const totalAmount = cartItems.reduce((total , obj)=> total + obj.quantity * obj.price ,0)
    const totalQuantity = cartItems.reduce((total , obj)=> total + obj.quantity ,0)

  return(
    <div className="container mx-auto">
        <h1 className="font-extralight text-3xl underline">Cart Items</h1>

        <div className="flex gap-5 my-2">
                <div className="flex flex-col flex-grow border p-4 justify-center items-center">
                        <h1>Total Quantity</h1>
                        <h1 className="font-semibold">{totalQuantity}</h1>
                </div>

                <div className="flex flex-col flex-grow border p-4 justify-center items-center">
                        <h1>Total Amount</h1>
                        <h1 className="font-semibold">{Math.round(totalAmount)}</h1>
                </div>

                <div className="flex flex-col flex-grow border p-4 justify-center items-center">
                        <h1>Checkout</h1>
                </div>
        </div>


        {
            cartItems.map((data)=> 
            <div key={data.id} className="flex items-center border my-2 p-3">
                <Image src={data.thumbnail} height={100} width={270} />

                <div className="flex flex-col pl-6 justify-center">
                    <h1 className="font-serif font-medium text-3xl mb-3">{data.title}</h1>
                    <h1 className="font-serif font-medium text-lg mb-3">{data.description}</h1>
                    <h1 className="font-serif font-thin text-lg mb-3">{data.category}</h1>
                    <h1 className="font-serif font-thin text-lg mb-3">{'$' + data.price}</h1>

                    <div className="flex gap-3 items-center">

                        
                    <Button onClick={()=> addItemToCart(data)} icon={<PlusOutlined />} twoToneColor="#0000ff" className="p-2">
                        
                    </Button>


                        <h1 className="text-xl">{data.quantity}</h1>

                        <Button onClick={()=> lessQuantityFromCart(data.id)} danger icon={ <MinusOutlined   />} className=" p-3 text-white" disabled ={data.quantity === 1}>
                       
                        </Button>

                    </div>

                    <Button
                    onClick={()=> removeItemFromCart(data.id)}
                    danger className="w-40 my-6">Remove Item</Button>
                </div>

                <div>

                </div>
            </div>)
        }
    </div>
  )
}


export default Cart