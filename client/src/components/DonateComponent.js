import React,{useState} from 'react';
import { Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Label,Col,Input} from 'reactstrap';
import axios from 'axios';

function loadScript(src){
    return new Promise((resolve)=>{
    const script = document.createElement('script')
    script.src = src
    
    script.onload = () => {
        resolve(true)
    }
    script.onerror=()=>{
        resolve(false)
    }
    document.body.appendChild(script)

    })
}





function Donate(){
    const [name, setName] = useState('')
    const [amount,setAmount] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')

   async function displayRazorpay(){
    
       

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if(!res){
            alert('Razorpay sdk failed to load!!')
            return
        }
        else{
            console.log('Razorpay loaded successfully')
        }

        const data =await axios.post('http://localhost:5000/razorpay')
        
         console.log(data.amount_paid);
        console.log(data);

        const options = {
            key: 'rzp_test_GZoIhlpTT3QTn2', // Enter the Key ID generated from the Dashboard
            currency:'INR',
            amount:amount * 100,
            order_id:data.id,
            name: "Fast Forward India",
            description: "Test Transaction",
            
            
            handler: function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            prefill: {
                "name": name,
                "email": email,
                "contact": phone
            },
            // notes: {
            //     "address": "Razorpay Corporate Office"
            // },
             theme: {
                 "color": "#F37254"
             }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
    }
    
    return(
        <div className="container-fluid justify-content-center">
            <br/><br/><br/>
            <div className="row">
                <div className="col-12 col-sm-4 offset-4" style={{padding: "15px"}}>
                            <Card style={{boxShadow:"2px 2px 8px 5px #888888", height: "700px",width:"500px"}}>
                                <CardHeader style={{background:'#45494C', width:'100%'}} className="text-white text-center">
                                    <img src='assets/images/final.png' style={{borderRadius:"50%"}}/>
                                    <h2 style={{ color:"white", fontFamily:"candara"}}><strong>DONATION</strong></h2>
                                </CardHeader>
                                <CardBody>
                                <Form method="post">
                          <FormGroup row>
                            <Label htmlFor="name" md={3}>Name:</Label>
                            <Col >
                              <Input type="text" id="name" name="name" placeholder="Name" onChange={event => setName(event.target.value)} 
                              
                                        />
                                        {/* <small style={{color:"red"}}>{this.state.nameErr}</small> */}
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="tel" md={3}>Contact No.:</Label>
                            <Col >
                              <Input type="tel" id="tel" name="tel" placeholder="987654321" onChange={event => setPhone(event.target.value)}
                               />
                              {/* <small style={{color:"red"}}>{this.state.emailErr}</small> */}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="email" md={3}>Email Id.:</Label>
                            <Col >
                              <Input type="email" id="email" name="email" placeholder="ffi@example.com" onChange={event => setEmail(event.target.value)}
                               />
                              {/* <small style={{color:"red"}}>{this.state.emailErr}</small> */}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label htmlFor="msg" md={3}>Amount:</Label>
                            <Col >
                              <Input type="number" min="50" id="amount" name="amount" placeholder="Amount(in rs)" onChange={event => setAmount(event.target.value)}
                               />
                              {/* <small style={{color:"red"}}>{this.state.messageErr}</small> */}
                            </Col>
                          </FormGroup>
                        </Form>
                                </CardBody>
                                <CardFooter style={{width:'100%'}}><button className="btn btn-outline-success btn-lg" onClick={displayRazorpay}>DONATE</button></CardFooter>
                                <br/>
                            </Card>
                </div>
             </div>
            </div>
    );
}



export default Donate;