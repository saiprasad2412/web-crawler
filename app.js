import * as cheerio from 'cheerio';
import express from 'express'
import fetch from 'node-fetch';
import helmet from 'helmet';

const app=express();
import fs from 'fs'

async function getFormulaOneDrivers(){
    try{
        const response = await fetch('https://www.formula1.com/en/drivers.html')
        // const response = await fetch('http://192.168.10.47:8000/index.html')
        const body=await response.text();
        const $ =cheerio.load(body);

        const wrapper = $('.listing-items--wrapper');
        // const wrapper = $('.row');
        console.log(wrapper.length);

        const items=[];
        $('.listing-items--wrapper >.row > .col-12').map((i,el)=>{
            const rank = $(el).find('.rank').text();
            const points = $(el).find('.points >.f1-wide--s').text();
            const firstName = $(el).find('.listing-item--name span:first').text();
            const lastName = $(el).find('.listing-item--name span:last').text();
            const team = $(el).find('.listing-item--team').text();
            const photo =$(el).find('.listing-item--photo img').attr('data-src');

            items.push({
                rank,
                points,
                firstName,
                lastName,
                team,
                photo
            })

        })

        console.log(items)
        // fs.writeFile('f1_full.json',JSON.stringify(items),(err)=>{
        //     if(err)return console.log(err);
        //     console.log('File created!')
        // }
        // )
        // fs.writeFile('rank.json',JSON.stringify(items[0]),(err)=>{
        //     if(err)return console.log(err);
        //     console.log('File created!')
        // }
        // )
        return items;


    }catch(error){
        console.log(error)
    }
    return null;
}

app.get('api/data',async (req,res)=>{
   const data= await getFormulaOneDrivers();
    res.send(data)
});

// getFormulaOneDrivers();


const port = 5000; // or any other port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// import cheerio from 'cheerio';
// import express from 'express';
// import fetch from 'node-fetch';
// import helmet from 'helmet';

// const app = express();

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "https://trusted-source.com"], // Include 'unsafe-eval' here
        // Add other directives as needed
      },
    })
  );

app.get('/api/data', async (req, res) => {
  try {
    const items = await getFormulaOneDrivers();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});
app.get('/favicon.ico', (req, res) => res.status(204));

// async function getFormulaOneDrivers() {
//   try {
//     const response = await fetch('https://www.formula1.com/en/drivers.html');
//     const body = await response.text();
//     const $ = cheerio.load(body);

//     const items = $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
//       const rank = $(el).find('.rank').text();
//       const points = $(el).find('.points > .f1-wide--s').text();
//       const firstName = $(el).find('.listing-item--name span:first').text();
//       const lastName = $(el).find('.listing-item--name span:last').text();
//       const team = $(el).find('.listing-item--team').text();
//       const photo = $(el).find('.listing-item--photo img').attr('data-src');

//       return {
//         rank,
//         points,
//         firstName,
//         lastName,
//         team,
//         photo,
//       };
//     }).get();

//     console.log(items); // Logging the items fetched from the webpage

//     return items; // Return the items fetched
//   } catch (error) {
//     console.error(error);
//     throw error; // Throw error for handling in calling function
//   }
// }

// const port = 5000; // or any other port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
