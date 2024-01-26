resave: true,
    store:  MongoDbStore.create({mongoUrl:url,collectionName:'sessions'}),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour