const Sale = require("../models/Sale");
const User = require("../models/User");
const Product = require("../models/Product");
const transport = require("../config/transport");

const salesControllers = {
  // enviar el mail aca tambien
  saveNewSale: async (req, res) => {
    let dateMail = new Date();
    console.log("Received SAVE NEW SALE Petition:" + Date());
    const { userId, amount, shopCart, shipping, methodPayment } = req.body;
    let tableBody = "";
    let textSaleMail = "";
    let numberOrder = 200;
    shopCart.forEach((item) => {
      tableBody += `<tr>
                <td style="color:#FFF;text-align: center">${item.name}</td>
                <td style="color:#FFF;text-align: center">${item.quantity}</td>
                <td style="color:#FFF;text-align: end">$ ${
                  (item.productPrice * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }</td>
            </tr>`;
    });
    !shipping
      ? (textSaleMail =
          "¡Muchas gracias por tu compra! En los próximos días recibirás otro correo electrónico con la confirmación para el retiro en sucursal. Por favor acercarse únicamente después de haber recibido el correo electrónico de confirmación para el retiro.")
      : (textSaleMail =
          "¡Muchas gracias por tu compra! En los próximos días recibirás otro correo electrónico con el CÓDIGO DE SEGUIMIENTO y un LINK para que puedas usarlo. Los tiempos de entrega dependen de La empresa de logistica, podrás verlos con ese link.");

    /* try{
       let sales=await Sale.find()
       numberOrder+=(sales.length+1)
      }catch(e){
        console.log(e)
      } */

    numberOrder += await Sale.find()
      .then((sales) => {
        return sales.length + 1;
      })
      .catch((error) => res.json({ success: false, response: error.message }));

    const newSale = new Sale({
      user: userId,
      amount,
      shopCart,
      shipping,
      methodPayment,
      numberOrder: numberOrder,
      date: Date(),
    });
    newSale
      .save()
      .then((savedSale) => {
        savedSale.shopCart.forEach((item) => {
          Product.findOneAndUpdate(
            { _id: item.productId },
            { $inc: { stock: item.quantity * -1 } },
            { returnOriginal: false }
          ).then((product) => {
            console.log(product.stock);
          });
        });
      })
      .catch((error) => res.json({ success: false, response: error.message }));

    User.findOne({ _id: userId })
      .then((userFound) => {
        /* background-color: #dfdbdb */
        let mailSale = {
          from: "Luxxor <luxxor.tech@gmail.com>",
          to: userFound.eMail,
          subject: `Compra #${numberOrder} aprobada`,
          html: `
                    <table style="max-width: 800px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <tr>
                            <td style="background: rgb(47,144,176);
                                background: radial-gradient(circle, rgba(47,144,176,1) 0%, rgba(48,106,154,1) 55%, rgba(49,75,136,1) 96%);box-shadow: 0 5px 16px 0 #433e3e94">
                                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                                <h1 style="color: #FFF; margin-left:500px;font-size:2.4rem;">LUXXOR</h1>
                                <h1 style="color: #FFF; margin: 0 0 7px">CONFIRMACION DE COMPRA #${numberOrder}</h1>
                                <h2 style="color: #FFF; margin: 0 0 7px">Hola ${userFound.lastName}, ${userFound.firstName}:</h2>
                                <p style="margin: 2px; font-size: 15px; color: #FFF">
                                    ${textSaleMail}
                                </p>
                                <hr/>
                                <h4 style="color:#FFF;"><span>Compra:</span> #${numberOrder}</h4>
                                <h4 style="color:#FFF;"><span>Fecha de compra:</span> ${dateMail.toLocaleDateString()}</h4>
                                <h4 style="color:#FFF;"><span>Forma de pago:</span> ${methodPayment} </h4>
                                <hr/>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style="color:#FFF;min-width: 80px;text-align: center">ARTÍCULO</th>
                                            <th style="color:#FFF;min-width: 80px;text-align: center">CANTIDAD</th>
                                            <th style="color:#FFF;min-width: 80px;text-align: center">SUBTOTAL</th>
                                        </tr>
                                    </thead>    
                                    <tbody>
                                       ${tableBody}
                                    <tbody>                                   
                                    <tfoot>
                                        <tr>
                                            <td style="color:#FFF;min-width: 80px;text-align: center">-</td>
                                            <td style="color:#FFF;min-width: 80px;text-align: center">Total:</td>
                                            <td style="color:#FFF;min-width: 80px;text-align: end">$ ${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <hr/>
                                <p style="color: #FFF; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                                
                            </td>
                        </tr>
                    </table>
                        `,
        };
        transport.sendMail(mailSale, (err, info) => {
          if (err) throw new Error(err);
          res.json({ success: true, response: info });
        });
      }) //desde aca se envia el mail
      .catch((error) => res.json({ success: false, response: error.message }));
  },

  getAllSales: (req, res) => {
    // para que el admin obtenga todas las ventas
    Sale.find()
      .populate("shopCart.productId")
      .then((salesFound) => {
        if (!salesFound.length) throw new Error("No hay ventas");
        res.json({ success: true, response: salesFound });
      })
      .catch((error) => res.json({ success: false, response: error.message }));
  },

  getOneSale: (req, res) => {
    Sale.find({ user: req.params.id })
      .populate("shopCart.productId")
      .then((saleFound) => {
        if (!saleFound.length) throw new Error("No tiene compras");
        res.json({ success: true, response: saleFound });
      })
      .catch((error) => res.json({ success: false, response: error.message }));
  },
};

module.exports = salesControllers;
