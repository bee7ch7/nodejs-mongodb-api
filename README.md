To run mongodb instance in docker:
```
docker run -d \
-p 27017:27017 \
-p 27018:27018 \
-p 27019:27019 \
-p 28017:28017 \
--name mongo \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
mongodb/mongodb-community-server:5.0-ubuntu2004
```

To import bookstore.books.json file to mongodb:
```
mongoimport --uri="mongodb://admin:password@localhost:27017" --db bookstore --collection books --file bookstore.books.json --jsonArray --authenticationDatabase=admin
```

Backup specific database:
```
mongodump --uri="mongodb://admin:password@localhost:27017" --out=my_dumps --db=bookstore --authenticationDatabase=admin
```

Restore database:
```
mongorestore --uri="mongodb://admin:password@localhost:27017" my_dumps --authenticationDatabase=admin
```
