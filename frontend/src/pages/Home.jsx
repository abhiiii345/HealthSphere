import React from 'react'
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Deaprtments";
import MessageForm from "../components/MessageForms";
const Home = () => {
  return (
    < >

      <Hero title={"Welcome to Your Trusted Healthcare Partner | Your Health, Our Priority"}  imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"} />
      <Departments/>
      <MessageForm/> 

     
      
    </ >
  )
}

export default Home
