
/* اول برای تمام المانها، درگ کردن پیشفرض را غیر فعال میکنیم */
Array.from(document.querySelectorAll('*')).map(el=>el.ondragstart = ()=>false);

/* ایتمهایی ک قراره درگ بشن رو انتخاب میکنم
همچنین دسته حیوانات و جدا و دسته میوه ها رو هم جدا انتخاب میکنیم */
const items      = Array.from(document.querySelectorAll('.items'));
const animItems  = Array.from(document.querySelectorAll('.imgAnim'));
const fruitItems = Array.from(document.querySelectorAll('.imgFruit'))

/* موقعیت در مکان اول  برای هر ایتم در یک ارایه میریزیم تا اگر اشتباه درگ کردیم بدانیم به کجا باید برگردیم */
let posAX = [];

/* این متغیر چک میکنه ک ایا بعد از رها شدن موس، ایتم همچنان درگ بشه یا نه */
let bool = true;

/* در اینجا مرز جعبه ای را که حیوانها د ان میریزیم اندازه میگیریم
برای اینکه بعدا تصمیم بگیریم ک ایا ایتم ما در این محدوده هست یا نه */
const animBox = document.querySelector('.anim-target');
animBox.style.left ='20vw'
const animBoxL = Number(animBox.style.left.split('vw')[0]*window.innerWidth/100);
const animBoxR = animBox.offsetWidth + animBoxL;
const animBoxT = Number(animBox.style.top.split('vw')[0]*window.innerWidth/100);
const animBoxD = animBox.offsetHeight + animBoxT;
/* همچنین برای جبع میوه ها این کار رو میکنیم */
const fruitBox = document.querySelector('.fruit-target');
fruitBox.style.left ='60vw'
const fruitBoxL = Number(fruitBox.style.left.split('vw')[0]*window.innerWidth/100);
const fruitBoxR = fruitBox.offsetWidth + fruitBoxL;
const fruitBoxT = Number(fruitBox.style.top.split('vw')[0]*window.innerWidth/100);
const fruitBoxD = fruitBox.offsetHeight + fruitBoxT;

/* حالا به هرییک از ایتمها ک قراره درگ بشن، موقعیت خودشنو میدیم */
for(let i = 0 ; i < items.length ; i++){
  items[i].style.left = (window.innerWidth/2 - 300) + i*100 + 'px';
  items[i].style.top =(window.innerHeight * .15) + 200 + 'px';
  // موقعیت مفت اونها رو توی ارایه ای که داشتیم میزاریم
  posAX.push((window.innerWidth/2 - 300) + i*100);
}
// همه ایتمهای ما که درگ خواهند شد ارتفاع ثابتی دارن که برابر است با
let posAY = Number(items[0].style.top.split('px')[0]);


/*
حال باید بگوییم اگر ایتم روش کلیک شد یا تاچ شد، تا زمانی که موس رو نگه داشته یا تاچ رو، موقعیت تاچ و لفت ایتم  همون بشود که تاچ یا موس هست
درنهایت وقتی موس یا تاچ رها میشود، تشخیص بده ک ایا هر ایتم در جعبه خود قرار دارد یا نه
*/

/* ابتدا میگم برای همه ایتمهایی که قراره درگ بشوند، تشخیص بده که کدام ایتم روش کلیک یا تاچ شده */
items.map(target=>{
  target.addEventListener('mousedown', ()=> mouseDown(target));
  target.addEventListener('touchstart',()=> mouseDown(target));
})

// زمانی که تاچ یا کلیک شد:
function mouseDown(target) {
  /* اجازه حرکت رو با متغیر زیر صادر میکنیم */
  bool = true;
  // هر متغیر در بالاترین سطح قرار بگیرد تا زیر متغیر دیگه نره و درواقع گمش نکنیم
  target.style.zIndex = '1000';
  // حالا ایونتهای رها کردن تاچ و کلیک و همچنین ایونتهای حرکت در حین فشار دادن موس را فعال کن
  target.addEventListener('mouseup', ()=> mouseUp(target));
  target.addEventListener('touchend',()=> mouseUp(target));
  target.addEventListener('mousemove',()=>bool? mouseMove( target):'');
  target.addEventListener('touchmove',()=>bool? mouseMove( target):'');
}

/* در اینجا موس و یا تاچ فشار داده شده و تابع موع هم که صدا زده شده تا اجرا بشه */
function mouseMove(target) {
  /* در اینجا میگیم اگه ایونت از نوع تاچ بود، موقعیت تاچ
  اگر ایونت ما موس کلیک بود، موقعیت رو بر اسا کلیک بسنج  */

  // موقعیت ایکس رو اول میسنجیم
  const tx = (event.type == 'touchmove') ? event.touches[0].clientX : event.clientX;
  // و اینجا موقعیت ایگرگ رو
  const ty = (event.type == 'touchmove') ? event.touches[0].clientY : event.clientY;

  // حالا موقعیت بدست اومده رو به لفت و تاپ ایتم نسبت میدیم
  target.style.left =  tx  - 50 + 'px';
  target.style.top  =  ty  - 50 + 'px';
}



// حالا میگیم اگه موس رها شد یا تاچ پایان یافت چه بشود
function mouseUp(target) {

 // موقعیت نهایی لفت و تاپ آیتمو رو میگیریم
  const targetLeft = Number(target.style.left.split('px')[0]) + 50;
  const targeTop = Number(target.style.top.split('px')[0]) + 50;

  // جعبه هایی هستن که ایتمها توشون خواهند رفت
  const animBasket = document.querySelector('.anim');
  const fruitBasket = document.querySelector('.fruit');
  
  // اگر ایتم ما داخل مرزهای جعبه حیوانها بود و اون ایتم عضو حیوانها بود، ایتم رو به جعبه اضافه کن 
  if(targetLeft > animBoxL && targetLeft < animBoxR  && targeTop > animBoxT && targeTop < animBoxD && animItems.includes(target)){
    // کد زیر ایتم را به جعبه اضافه میکند
      animBasket.appendChild(target);
    // با کد زیر حالت پیشفرض رو برای استایل ایتم در نظر میگیریم تا توی جعبه نشان داده بشه
    target.style.all = 'unset';

      /*
      اینجا یکی از ایتم ها وارد جعبه حیوانها شده و درست هم وارد شده. میشه هر چیزی رو اینجا گذاشت و هر کاری کرد
      */
      console.log('a animal complete')
  }else{
    // اگر شرط ما بر قرار نبود آیتم برگرده سر جای اولش
    target.style.left = posAX[items.indexOf(target)] + 'px';
    target.style.top = posAY + 'px';
  }

// اگر ایتم داخل مرز جعبه میوه باشه و اون ایتم که درگ شده عضو میوه ها باشه، عملیات زیر رو انجام بده 
  if(targetLeft > fruitBoxL && targetLeft < fruitBoxR  && targeTop > fruitBoxT && targeTop < fruitBoxD && fruitItems.includes(target)){
    // با کد زیر ایتم رو وارد جعبه میوه میکنیم
    fruitBasket.appendChild(target);
    // با کد زیر حالت پیشفرض رو برای استایل ایتم در نظر میگیریم تا توی جعبه نشان داده بشه
    target.style.all = 'unset';
    /*
    اینجا یککی از ایتم های میوه درن جعبه قرار گرفته و اگه فانکشن یا کالبکی میخواید میزارید
    */
    console.log('a fruit complete')

  }else{
    // اگر شرط برقرار نشد ایتم برگرده سر جاش
    target.style.left = posAX[items.indexOf(target)] + 'px';
    target.style.top = posAY + 'px';
  }

  /*
   اگر تعداد کل ایتم ها برابر بود تعداد ایتم های درون جعبه حیوان به علئاه تعداد ایتم های درون جعبه میوه
   به این معنیه کک همه ایتم ها توی جعبه خودشونن و پازل تکمیل شده
   */
  if(items.length === (fruitBasket.children.length + animBasket.children.length)){

    console.log('All immage complete')
    $(function (){
        setTimeout(function HandlerImg(){location.href="./2.html"},3000)}
        )
     document.getElementById('winston').src = "../attention/asssets/200w.webp"

  }

  // در اینجا میگیم دیگه ایتم با حرکت موس یا تاچ حرکت نکنه 
  // اگر نیاز باشه دوباره روی ایتم کلیک میکنه و اونجا ترو میشه و ادامه ماجرا
  bool = false;
}






