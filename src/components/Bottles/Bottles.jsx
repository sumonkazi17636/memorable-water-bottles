import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLocalStorage, getStoredCart, removeFromLocalStorage } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles,setBottles] = useState([])
    const [cart,setCart]= useState([])
    useEffect(()=>{
        fetch('bottles.json')
        .then(res =>res.json())
        .then(data=>setBottles(data))
    },[])

    useEffect(()=>{
            if(bottles.length){
                const storedcartId = getStoredCart()
                console.log(storedcartId,bottles)
                const savedCart = []
                for(const id of storedcartId){
                   const bottle = bottles.find(bottle =>bottle.id ===id)
                       if(bottle){
                        savedCart.push(bottle)
                       }
                    }
                
                console.log(savedCart)
                setCart(savedCart)
            }
    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart,bottle]
        setCart(newCart)
        addToLocalStorage(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle =>bottle.id !==id)
        setCart(remainingCart)
        removeFromLocalStorage(id)
    }
    return (
        <div>
            
            <h3>Bottles Available:{bottles.length}</h3>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

            <div className="bottles-container">
            {
                bottles.map(bottle =><Bottle key={bottle.id} bottle ={bottle} handleAddToCart={handleAddToCart}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;