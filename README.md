[![Managing App](https://i.postimg.cc/RhQ4vnLY/Zrzut-ekranu-2022-12-6-o-15-53-23.png)](https://postimg.cc/bSJKTrM0)

# Managing App 📦

### Created it because :
Managing App arrised from a Redux training. Now Redux is used here for:
* Managing Company finance - you can place order with 100 PLN bank account but you will not pay for this order if it is above 100 PLN
* Managing orders - thanks to Redux you can freely add/delete orders before adding it to server.


### What's inside ?
* First view - view that you see on screenshot above. There is your company name that you can freely change by clicking Settings in top-left corner.
* Bottom % - default 100% is 10k PLN. This % is ammount of money that was deposited by 'Deposit' button
* Click an image to go into App
<br>
* Main site - that's the place where you can manage your account. You can also see some options in right. Jsut ecplore it.
<br>

### Main purpose - schema:
* Place and order with correct data. You can ad one or more positions to order
* Deposit some money to your account
* Go to orders and match orders that you want to pay. Remember that summary price of all matched orders has to be lower than your bank account.
* If you payed for that - orders will dissapear from 'unpayed list' and this summary price will be substract from account
* Now you can go to Invoices and see orders that was payed by transaction number. You can filter by date or enable 'Show all'
* When you will click filename you will see what orders you have paid for in this transaction.

# Usage & Installation 

## Installation 💿

1. Download project from Github repository. 
2. Open downloaded file in your code editor. Now you can download all necessary packages:
    ```
    npm install
    ```

3. After that you are ready to initialize json-server:
```
npx json-server --watch db.json
```


4. Chceck your localisation. And type : 
```
npm start 
```

When terminal ask you, just type Y to open App in port  other than 3000.


5. Explore the App

<br>

# Technologies and libraries

| Technology | Description |
|------------|------------|
|[TypeScript](https://www.javascript.com/)| Main language used to make Managing App logic|
|[SCSS](https://css-tricks.com/)| CSS preprocessor that makes CSS more powerfull, more readable and more friendly to styling components |
|[React](https://pl.reactjs.org/)| Powerfull library to create Single Page App (SPA) |
|[React Router DOM](https://reactrouter.com/en/main)| Library that allows to create paths to different elements and links to it. It helps to change SPA to multipage App|
|[Formik](https://tanstack.com/query/v4)|Using this library make form using much simpler. Especially in submitting. It also cooperate with yup|
|[Yup](https://www.npmjs.com/package/yup)|Improving form validation.|
|[json-server](https://www.npmjs.com/package/json-server)|It makes fake API from json file|
|[Redux](https://redux.js.org/)|State container that stores every variable and data that should be accesible in the whole application |



# PROJECT IS NOT FINISHED ! What will change ?
1.  📦 Magazine - one of the most important pilars of this App. It will storage all of yours items that you payed for (from orders). For now - app uses json-server that was good for begining. But as the App grew - I decided that it will be more clear and comfortable to use SQL database. So for now - I'm transferring data from json-server to postgreSQL. After that I will code some logic that will make it easier for you to use Magazine.
2. 🖊️ Editability - For now some of operations have disabled options.
3. 👌🏻 Design - some major differences will be released when all of logic things will be done.
4. 📚 Libraries - I will add some libraries to project like tanstack and lazy loading.
5. ❓ EXTRAS - Stay tuned !
