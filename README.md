# PROJECT NOT FINISHED !
For now you can : 
* change data of your company, 
* deposit money (not connected to database yet. For now it uses only Redux, so if you will refresh page - you're account will be zeroed) and withdraw it,
* place order,
* Pay for all orders that is matched - if you have enough deposited money,
* See your payed orders - you can filter by date or show every payed order

# WHAT FINAL VERSION WILL INCLUDE ? WHAT WILL CHANGE ?
1.  📦 Magazine - one of the most important pilars of this App. It will storage all of yours items that you payed for (from orders). For now - app uses json-server that was good for begining. But as the App grew - I decided that it will be more clear and comfortable to use SQL database. So for now - I'm transferring data from json-server to postgreSQL. After that I will code some logic that will make it easier for you to use Magazine.
2. 🖊️ Editability - For now some of operations have disabled options e.x. to delete position. It will be fixed when I will finally implement SQL DS.
3. 👌🏻 Design - some major differences will be released when all of logic things will be done.
4. 📚 Libraries - I will add some libraries to project like tanstack and lazy loading.
5. ❓ EXTRAS - Stay tuned !

# HOW TO RUN IT?

1. Clone repo 
2. Instal all necessary libs by typing:
```
npm install
```
in terminal <br>
3. Run json-server on port 3000
```
npm json-server --watch datas.json
```
4. And now start App on localhost:3001
```
npa start
```
