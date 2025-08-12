using my.bookshop as my from '../db/schema';

service Catalog1Service {
    @readonly entity Books as projection on my.Books;
}
