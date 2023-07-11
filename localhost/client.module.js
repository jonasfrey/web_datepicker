import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
import {
    f_add_css,
    f_s_css_prefixed
} from "https://deno.land/x/f_add_css@0.6/mod.js"


let f_ensure_type = function(
    value, 
    type, 
    s_var_name 
){

}
let f_f_b_selectable__between_dates = function(
    o_date_from, 
    o_date_to
){
    if(o_date_from instanceof Date == false){
        throw new Error('type error: `o_date_from` has to be instance of `Date`');
    }
    if(o_date_to instanceof Date == false){
        throw new Error('type error');
    }
    return function(o_date){
        // console.log("o-date")
        // console.log(o_date)
        return o_date.getTime() > o_date_from.getTime()
        && o_date.getTime() < o_date_to.getTime()
    }


}
class O_state{
    constructor(
        o_element_html,
        o_date = new Date(),
        f_on_update__o_date = function(){},
        f_b_selectable = function(){},
        f_on_click__o_date = function(){return true},
    ){
        if(o_element_html instanceof HTMLElement == false){
            throw new Error('type error');
        }
        if(o_date instanceof Date == false){
            throw new Error('type error');
        }
        if(typeof f_on_update__o_date != 'function'){
            throw new Error('type error');
        }
        if(typeof f_b_selectable != 'function'){
            throw new Error('type error');
        }
        if(typeof f_on_click__o_date != 'function'){
            throw new Error('type error');
        }

        this.o_element_html = o_element_html
        this.o_date = o_date
        this.f_on_update__o_date = f_on_update__o_date
        this.f_b_selectable = f_b_selectable
        this.f_on_click__o_date = f_on_click__o_date
        
        this._o_date__being_selected = new Date(this.o_date.getTime());

        this.b_show_picker = false;
        this.a_s_name_month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        this.n_selectable_years_plus_minus = 10;
        this.a_n_year = [];
        let o_date_minus = new Date(this.o_date.getTime());
        let o_date_plus = new Date(this.o_date.getTime());
        this.a_n_year.push(this.o_date.getUTCFullYear())
        for(var n_it = 0; n_it < this.n_selectable_years_plus_minus; n_it+=1){
            o_date_minus = new Date( o_date_minus.setUTCFullYear(o_date_minus.getUTCFullYear()-1))
            o_date_plus = new Date( o_date_plus.setUTCFullYear(o_date_plus.getUTCFullYear()+1))
            this.a_n_year.push(
                o_date_minus.getUTCFullYear(), 
                o_date_plus.getUTCFullYear()
            )
        }
        this.a_n_year.sort((n1, n2)=>n1-n2)
        // console.log(this.a_n_year)


    }
}

let f_s_version_suffix = function(s_version_with_dot){
    let s_version_without_dot = s_version_with_dot.replaceAll(".", "_");
    return `v_${s_version_without_dot}`;
}
let s_version = `0.1`;
let s_version_class = `web_datepicker_${f_s_version_suffix(s_version)}`;


var f_s_ymd_from_n_ts_ms = function(
    n_ts_ms,
    b_localtime = false
){

    var o_date  = new Date(n_ts_ms);

    var s_y = o_date.getUTCFullYear();
    var s_m = (o_date.getUTCMonth()+1).toString().padStart(2,'0');
    var s_d = (o_date.getUTCDate()).toString().padStart(2,'0');
    if(b_localtime){
        s_y = o_date.getUTCFullYear();
        s_m = (o_date.getUTCMonth()+1).toString().padStart(2,'0');
        s_d = (o_date.getUTCDate()).toString().padStart(2,'0');
    }
    var s_ymd = `${s_y}-${s_m}-${s_d}`;

    return s_ymd;
    
}

let f_b_same_day = function(
    o_date_1, 
    o_date_2
){
    return o_date_1.getUTCFullYear() == o_date_2.getUTCFullYear()
        && o_date_1.getUTCMonth() == o_date_2.getUTCMonth()
        && o_date_1.getUTCDate() == o_date_2.getUTCDate()
}

let f_o_js__datepicker = function(
    o_state
){
    let o_js_active = null;
    let o_js_s_name_month_n_year = null;
    let o_js_input = {
        f_o_js: function(){

            return {
                class: "input",
                a_o: [
                    // {
                    //     s_tag: 'input',
                    //     class:'day', 
                    //     onfocus: function(){
                    //         this.select()
                    //     }, 
                    //     value: '01', 
                    //     type: "text", 
                    //     pattern:"[0-9]{2}", 
                    //     onkeyup: function(){
                    //         let n = parseInt(this.value)
                    //         if(window.event.key == "ArrowLeft"){
                    //             if(this.previousSibling){
                    //                 this.previousSibling.focus();
                    //             }
                    //         }
                    //         if(window.event.key == "ArrowRight"){
                    //             if(this.nextSibling){
                    //                 this.nextSibling.focus();
                    //             }
                    //         }
                    //         if(window.event.key == "ArrowDown"){
                    //             n -=1;
                    //         }
                    //         if(window.event.key == "ArrowUp"){
                    //             n +=1;
                    //         }
                    //         console.log(n)
                    //         if(n.toString().length == 1){
                    //             n = n.toString().padStart(2, '0')
                    //         }
                    //         n = n.toString()
                    //     }
                    // },
                    // {
                    //     s_tag: 'input',
                    //     class:'month', 
                    //     onfocus: function(){
                    //         this.select()
                    //     }, 
                    //     value: '01', 
                    //     type: "text", 
                    //     pattern:"[0-9]{2}"

                    // },
                    // {
                    //     s_tag: 'input',
                    //     class:'year', 
                    //     onfocus: function(){
                    //         this.select()
                    //     }, 
                    //     value: '01', 
                    //     type: "text", 
                    //     pattern:"[0-9]{4}"
                    // },
                    {
                        s_tag: "input", 
                        readonly: 'true',
                        class: "clickable",
                        type: "text",
                        value:  f_s_ymd_from_n_ts_ms(
                            o_state.o_date.getTime()
                        ), 
                        onmousedown: function(){
                            o_state.b_show_picker = true
                            o_js_s_name_month_n_year._f_render();
                        }
                    },
                    {
                        s_tag: 'i',
                        class: "fa-regular fa-calendar icon clickable", 
                        onmouseup: function(){
                            o_state.b_show_picker = !o_state.b_show_picker
                            o_js_s_name_month_n_year._f_render();
                        }
                    }
                ]
            }
        }
    }
    let o_js_a_s_name_day = {
        f_o_js: function(){
            var o_date = o_state._o_date__being_selected;
            var o_date_last_day_of_month = new Date(
                Date.UTC(
                    o_date.getUTCFullYear(),
                    o_date.getUTCMonth()+1,
                    0,
                )
            );
            var o_date_first_day_of_month = new Date(
                Date.UTC(
                    o_date.getUTCFullYear(),
                    o_date.getUTCMonth(),
                    1,
                )
            );
            var o_date_start = o_date_first_day_of_month;
            let n_ms__one_day = 24*60*60*1000;
            while(o_date_start.getUTCDay() != 1){
                o_date_start = new Date(o_date_start.getTime()-n_ms__one_day)
            }

            var o_date_end = o_date_last_day_of_month;
            while(o_date_end.getUTCDay() != 0){
                o_date_end = new Date(o_date_end.getTime()+n_ms__one_day)
            }
            var a_o_date_day = [];
            var o_date_it = o_date_start; 
            while(o_date_it.getTime() <= o_date_end.getTime()){
                a_o_date_day.push(o_date_it)
                o_date_it = new Date(o_date_it.getTime()+n_ms__one_day);
            }
            var a_s_name_day = [
                "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
            ];
            return {
                a_o:[
                    {
                        "class": [
                            "a_s_name_day", 
                            'd_flex'
                        ].join(" "),
                        a_o: [
                            ...a_s_name_day.map(function(s_name_day){
                                return {
                                    class: [
                                        "w_1_t_7",
                                        'pt-0_9_rem',
                                        'pb-0_9_rem',
                                    ].join(" "),
                                    innerText: s_name_day
                                }
                            })
                        ]
                    }, 
                    {
                        "class": [
                            "a_o_date_day", 
                            'd_flex'
                        ].join(" "),
                        a_o: [
                            ...a_o_date_day.map(function(o_date_day){
                                var b_selectable = o_state.f_b_selectable(o_date_day);
                                var b_day_of_this_month = o_date_day.getUTCMonth() == o_state._o_date__being_selected.getUTCMonth();
                                let b_same_day = f_b_same_day(o_date_day, o_state.o_date);
                                let b_clickable = b_day_of_this_month && b_selectable;
                                let b_clicked = b_same_day;
                                return {
                                    class: [
                                        `w_1_t_7`,
                                        'pt-0_9_rem',
                                        'pb-0_9_rem',
                                        ((b_clickable) ? 'clickable' : ''), 
                                        ((b_clicked) ? 'clicked' : ''), 
                                    ].join(" "),
                                    innerText: (b_day_of_this_month) ? o_date_day.getUTCDate(): '',//.toString().padStart(2,'0'), 
                                    onclick: function(){
                                        if(!b_day_of_this_month){
                                            return
                                        }
                                        o_state._o_date__being_selected = o_date_day;
                                        
                                        o_js_a_s_name_day._f_render();
                                        if(b_selectable){
                                            o_state.o_date = o_date_day
                                            o_state.f_on_update__o_date(
                                                o_state.o_date
                                            );
                                        }
                                        o_state.f_on_click__o_date(
                                            o_date_day
                                        );
                                        o_js_a_s_name_day._f_render()
                                        o_js_input._f_render();
                                    }
                                }
                            })
                        ]
                    }, 
                ]
            }

            // console.log(o_date_start)
            // console.log(o_date_end)
        }
    };
    let o_js_a_s_name_month = {
        f_o_js: function(){
            return {
                class: "a_s_name_month d_flex",
                a_o:[
                    ...o_state.a_s_name_month.map(
                        function(s_name_month){
                            var n_idx_month = o_state.a_s_name_month.indexOf(s_name_month);
                            var o_date_month = new Date(new Date().setUTCMonth(n_idx_month));

                            var b_selectable = true;//we would need to check every day of month if it is selectable, if even one day is selectable the whole month is selectable //o_state.f_b_selectable(o_date_month);
                            let b_same_month = o_state.o_date.getUTCMonth() == o_date_month.getUTCMonth();
                            let b_clickable = b_selectable;
                            let b_clicked = b_same_month;

                            return {
                                class: [
                                    "s_name_month", 
                                    ((b_clickable) ? 'clickable' : ''), 
                                    ((b_clicked) ? 'clicked' : ''), 
                                    'w_1_t_3',
                                    'pt-0_9_rem',
                                    'pb-0_9_rem',
                                ].join(' '),
                                innerText: s_name_month,
                                onclick: function(){
                                    o_state._o_date__being_selected = new Date(
                                        o_state._o_date__being_selected.setUTCMonth(n_idx_month)
                                    );

                                    o_js_active = o_js_a_s_name_day;
                                    o_js_s_name_month_n_year._f_render();
                                }
                            };
                        }
                    )
                ]
            }
        }
    };
    let o_js_a_n_year = {
        f_o_js: function(){
            return {

                
                class: "a_n_year d_flex",
                a_o:[
                    ...o_state.a_n_year.map(
                        function(n_year){
                            
                            var b_selectable = true;//n_year == o_state.o_date.getUTCFullYear()
                            //we would need to check if the date is selectable for every day in the year to know if a year is selectable/clickable

                            let b_clickable = b_selectable;
                            let b_clicked = false;

                            return {
                                class: [
                                    "n_year", 
                                    'w_1_t_3',
                                    'pt-0_9_rem',
                                    'pb-0_9_rem',
                                    ((b_clickable) ? 'clickable' : ''), 
                                    ((b_clicked) ? 'clicked' : ''), 

                                ].join(' '),
                                innerText: n_year,
                                onclick: function(){
                                    o_state._o_date__being_selected = new Date(
                                        o_state._o_date__being_selected.setUTCFullYear(n_year)
                                    );
                                    o_js_active = o_js_a_s_name_day;
                                    o_js_s_name_month_n_year._f_render();

                                }
                            };
                        }
                    )
                ]
            }
        }
    }
    o_js_active = o_js_a_s_name_day;
    o_js_s_name_month_n_year = {
        f_o_js:function(){
            return {
                class:  "o_js_s_name_month_n_year",
                a_o: [
                    {
                        b_render: o_state.b_show_picker,
                        a_o:[
                            {
                                class: "nav", 
                                a_o:[
                                    {
                                        class: [
                                            'p-1_2_rem',
                                            'clickable'
                                        ].join(' '),
                                        innerText: "<", 
                                        onclick: function(){
                                            o_state._o_date__being_selected = new Date(
                                                o_state._o_date__being_selected.setUTCMonth(
                                                    o_state._o_date__being_selected.getUTCMonth()-1
                                                )
                                            );
                                            o_js_s_name_month_n_year._f_render()
                                        }
                                    },
                                    {
        
                                        class: [
                                            'p-1_2_rem',
                                            'clickable'
                                        ].join(' '),
                                        innerText: o_state.a_s_name_month[o_state._o_date__being_selected.getUTCMonth()].substring(0,3), 
                                        onclick: function(){
                                            //switch to monmth view
                                            o_js_active = o_js_a_s_name_month
                                            o_js_s_name_month_n_year._f_render()
                 
                
                                        }
                                    },
                                    {
                                        class: [
                                            'p-1_2_rem',
                                            'clickable'
                                        ].join(' '),
                                        innerText: ">", 
                                        onclick: function(){
                                            o_state._o_date__being_selected = new Date(
                                                o_state._o_date__being_selected.setUTCMonth(
                                                    o_state._o_date__being_selected.getUTCMonth()+1
                                                )
                                            );
                                            o_js_s_name_month_n_year._f_render()
                                        }
                                    },
                                    {
                                        class: [
                                            'p-1_2_rem',
                                            'clickable'
                                        ].join(' '),
                                        innerText: o_state._o_date__being_selected.getUTCFullYear(), 
                                        onclick: function(){
                                            //switch to year view
                                            o_js_active = o_js_a_n_year
                                            o_js_s_name_month_n_year._f_render()
                                        }
                                    },
                                ]
                            },
                            o_js_active, 
        
                        ]
                    }
                ]
            }
        }
    }

    let o = {
        class: s_version_class,
        a_o:[
            o_js_input,
            o_js_s_name_month_n_year,
        ], 
        onmouseup: function(){
            o_state.n_ts_tmp = window.performance.now();
        }
    };
    window.onmouseup = function(){
        let b_close = (window.performance.now() - o_state.n_ts_tmp) > 200;
        if(b_close){
            o_state.b_show_picker = false;
            o_js_s_name_month_n_year._f_render();
        }
    }
    var o_html = f_o_html_from_o_js(o);
    o_state.o_element_html.appendChild(o_html);
    // var o_iframe = document.createElement("iframe");
    // o_state.o_element_html.appendChild(o_iframe)
    // o_iframe.contentWindow.document.body.appendChild(o_html);

    f_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    let s_color_clicked = 'rgb(174,203,250)'
    let s_color_clickable = 'rgb(241,243,244)'
    let s_color_clicked_clickable = 'rgb(138,180,248)';
    
    let s_css = `
            .d_flex{
                display: flex;
                flex-wrap: wrap;
            }
    
            .w_1_t_7{
                align-items: center;
                display: flex;
                justify-content: center;
                flex: 1 1 calc(100%/7);
            }
    
            .w_1_t_3{
                align-items: center;
                display: flex;
                justify-content: center;
                flex:1 1 calc(100%/3);
            }
            *{
                color: rgb(25 25 25 / 50%);
            }
            ${['clickable'].map(
                s=>`
                .${s}{
                    border-radius:3px;
                    color: rgb(12 12 12 / 90%)
                }
                .${s}:hover{
                    background-color: ${s_color_clickable};
                    cursor:pointer;
                    color: rgb(12 12 12 / 90%)
                }
                .${s}.clicked{
                    background-color: ${s_color_clicked};
                    cursor:pointer;
                    color: rgb(12 12 12 / 90%)
                }
                .${s}.clicked:hover{
                    background-color: ${s_color_clicked_clickable};
                    cursor:pointer;
                    color: rgb(12 12 12 / 90%)
                }
                `
            ).join('\n')}
            *{
                font-family:helvetica;
            }
            ${(new Array(20).fill(0)).map(
                function(n, n_idx){
                    let num = (n_idx /10)
                    let s_n = num.toString().split('.').join('_');
                    return `
                        .p-${s_n}_rem{padding: ${num}rem}
                        .pl-${s_n}_rem{padding-left: ${num}rem}
                        .pr-${s_n}_rem{padding-right: ${num}rem}
                        .pt-${s_n}_rem{padding-top: ${num}rem}
                        .pb-${s_n}_rem{padding-bottom: ${num}rem}
                    `
                }
            ).join("\n")} , 
            .o_js_s_name_month_n_year{
                max-width:500px
            }
            .nav{
                display:flex;
            }
    `;
    let s_css_prefixed = f_s_css_prefixed(
        s_css,
        `.${s_version_class}`
    );
    f_add_css(s_css_prefixed)


    return o;
}

export {
    f_o_js__datepicker, 
    f_s_version_suffix, 
    O_state, 
    f_f_b_selectable__between_dates
}