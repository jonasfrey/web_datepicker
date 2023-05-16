<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Tue May 16 2023 15:21:25 GMT+0200 (Central European Summer Time)","n_ts_created":1684243285359} -->
# import lib
```javascript
            import {
                f_o_js__datepicker, 
                O_state, 
                f_f_b_selectable__between_dates
            } from "./client.module.js"
            // } from "https://deno.land/x/web_datepicker@[version]/mod.js"

```
# create a datepicker
```javascript
            let o_div_target = document.querySelector("#datepicker");
            let f_on_update__o_date = function(
                o_date
                ){
                // this function is called when the date has been updated
                console.log("a new date has been selected!")
                        console.log(this.o_date);// date is in 'this'
                        console.log(o_date)//date is also first argument of functiond
            }
            let f_b_selectable__date = function(
                o_date
                ){
                //this functions returns a boolean that defines if a date is pickable
                let s_day = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][o_date.getDay()]
                return (s_day != "Sa") && (s_day != 'Su')
            }
            let f_on_click__o_date = function(
                o_date
            ){
                // this function is called when a date has been clicked on even it is displayed as not clickable/not selectable
                console.log('date has been clicked on')
                console.log(o_date)
                console.log(f_b_selectable__date(o_date))
                if(!f_b_selectable__date(o_date)){
                    console.error("this date cannot be selected")
                }
            }
            let o_js__datepicker = f_o_js__datepicker(
                new O_state(
                    o_div_target,//o_element_html,
                    new Date(),//o_date,
                    f_on_update__o_date,
                    f_b_selectable__date,
                    f_on_click__o_date
                )
            );
```
# create a with a helper function that limits the selectable dates by a start and an end date
```javascript

            let o_date = new Date(); 
            let n_days = 10;
            let o_date_plus_n_days = new Date(new Date().getTime() + 24*60*60*1000*n_days);
            let o_date_minus_n_days = new Date(new Date().getTime() - 24*60*60*1000*n_days);
            let o_js__datepicker_2 = f_o_js__datepicker(
                new O_state(
                    document.querySelector("#datepicker_from_to_example"),//o_element_html,
                    o_date,
                    function(){
                        console.log("a new date has been selected!")
                        console.log(this.o_date);
                    },
                    f_f_b_selectable__between_dates(
                        o_date_minus_n_days, 
                        o_date_plus_n_days
                    )
                )
            );
```
# every date with even day number is selectable
```javascript

            var o_div = document.createElement("div");
            document.body.appendChild(o_div)
            let o_js__datepicker_3 = f_o_js__datepicker(
                new O_state(
                    o_div,
                    o_date,
                    function(){
                        console.log("a new date has been selected!")
                        console.log(this.o_date);
                    },//f_on_update__o_date
                    function(o_date){
                        return o_date.getDay() % 2 == 0
                    }
                )
            );
```