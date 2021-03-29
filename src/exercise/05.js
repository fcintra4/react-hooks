// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()

    // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })

  // useEffect() é executado sempre após um componente ser atualizado na tela
  React.useEffect(() => {
    const tiltNode = tiltRef.current
    //const tiltNode = document.getElementById('tiltRoot')
    // Chamada à bilbioteca VanillaTilt
    VanillaTilt.init(tiltNode, {
        max: 25,
        speed: 1000,
        glare: true,
        'max-glare': 0.5
    }) 
    
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:

  // refs possibilitam que elementos HTML sejam acessados pelo React e inclusive
  // repassados para outras bibliotecas
  const tiltRef = React.useRef()

  return (
    <div className="tilt-root" id="tiltRoot" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
