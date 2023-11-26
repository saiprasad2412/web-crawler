import * as cheerio from 'cheerio';
import { Console } from 'console';
import fetch from 'node-fetch';


async function getFormulaOneDrivers(){
    try{
        const response = await fetch('https://www.formula1.com/en/drivers.html')
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
            // const team = $(el).find('.listing-items--team').text();
            // const photo =$(el).find('.listing-item--photo').attr('data-srcset');

            items.push({
                rank,
                points,
                firstName,
                lastName,
                // team,
                // photo
            })

        })

        console.log(items)


    }catch(error){
        console.log(error)
    }
}
getFormulaOneDrivers();