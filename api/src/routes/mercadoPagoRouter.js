const Order = require('./../models/Order.js');
const server = require('express').Router();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
});

//Ruta que genera la URL de MercadoPago
server.get("/:_id", async(req, res, next) => {

  const {_id} = req.params;
  const foundOrder = await Order.find({_id},); 
 
  
  if(!foundOrder) return res.status(404).json({message:"Order Not Found"});
  return res.status(200).json(foundOrder);
  
  const items_ml = foundOrder.map ((i) => ({
    title: i.product.name,
    unit_price: i.product.price,
    quantity: i.quantity,
  }))

  return res.status(200).json(items_ml)

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${_id}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('responded')
    //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(response.body)
    res.json({ id: global.id });
  })
  .catch(function(error){
    console.log(error);
  })
}) 

//Ruta que recibe la información del pago
server.get("/pagos", (req, res) => {
  console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  Order.findById(external_reference)
  .then((order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "completed"
    console.info('Salvando order')
    order.save()
    .then((_) => {
      console.info('redirect success')
      
      return res.redirect("http://localhost:3000")
    })
    .catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
    })
  })
  .catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
  })

  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = server;