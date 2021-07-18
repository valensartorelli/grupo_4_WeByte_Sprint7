const path = require('path');
let db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const {validationResult} = require('express-validator');
const imagesController = require('./imagesController');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Product = db.Product;
const Brand = db.Brand;
const Category = db.Category;
const Color = db.Color;
const Size = db.Size;
const Visibility = db.Visibility;
const Image = db.Image;

//const { Product, Brand, Category, Color, Size, Visibility } = require('../database/models');

const productController = {

    list: async (req, res) =>{
        try{ 
            let products = await Product.findAll({
                include: [
                   "brand", "category", "color", "size", "visibility", "images"
                ]
            });

            console.log(products);
            console.log("URL: " + req.params.category);
            
            const categoria = req.params.category;
            return res.render('products/products', {products, categoria});
            
        }
        catch(error){
            console.log(error);
        }


    },
    detail: (req, res) =>{
        console.log('entre a Detail product')
        console.log('----------------------------')
        let productId = req.params.id;
        Product.findByPk(productId,
            {
                include : ['images','category','brand', 'color', 'size', 'visibility' ]
            })
            .then(product => {
               // res.json(product)
                res.render('products/productDetail', {product});
            });
    },

    search: async (req, res) =>{
        try {
            let search= req.query.keyword ;
            let products = await Product.findAll({
                where: {
                    name: { [Op.like] : '%' + search + '%' }
                },
                include : ['category','brand', 'color', 'size', 'visibility','images' ]
            })
            
            console.log("RESULTADO: " + products.length);

            if (products.length !== 0) {
                const categoria = req.params.category;
                res.render('products/productSearch', {products, categoria})
            } else {
                res.render('products/productNoSearch');
            }
            
        } catch (error) {
            res.send(error)
        }
    
    },

    
    //CRUD
    add: (req, res) =>{
        let promCategories = Category.findAll();
        let promBrands = Brand.findAll();
        let promColors = Color.findAll();
        let promSizes = Size.findAll();
        let promVisibilities = Visibility.findAll();
        
        Promise
        .all([promCategories, promBrands, promColors, promSizes, promVisibilities ])
        .then(([allCategories, allBrands, allColors, allSizes, allVisibilities]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'products/createProduct'), {allCategories, allBrands, allColors, allSizes, allVisibilities})})
        .catch(error => res.send(error))
    },
    
    create: async (req, res) =>{
        console.log('entre en el Create product')
        console.log('----------------------------')
        console.log(req.body.name);
        console.log(req.body.stock);
        console.log(req.body.stock_min);
        console.log(req.body.stock_max);
        console.log(req.body.description);
        console.log(req.body.price);
        console.log(req.body.brandId);
        console.log(req.body.categoryId);
        console.log(req.body.sizeId);
        console.log(req.body.colorId);
        console.log(req.body.visibilityId);
        console.log(req.body.home);
        console.log(req.body.extended_description);   
    // validacion trae las relaciones
    const products = await db.Product.findByPk(req.params.id);
    let allCategories = await Category.findAll();
    let allBrands = await Brand.findAll();
    let allColors = await Color.findAll();
    let allSizes = await Size.findAll();
    let allVisibilities = await Visibility.findAll();
    // validacion del create
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.render('products/createProduct', {
        products,
        allCategories,
        allBrands,
        allColors,
        allSizes,
        allVisibilities,
        errors: errors.mapped(),
        oldData: req.body, //Esto es para que no se vaya borrando lo que uno escribe

      });
    }    
       // primero crea el producto
        try{
          let productCreated = await Product.create({
                name: req.body.name,
                stock: req.body.stock,
                stock_min: req.body.stock_min,
                stock_max: req.body.stock_max,
                description: req.body.description,
                price: req.body.price,
                brandId: req.body.brandId,
                categoryId: req.body.categoryId,
                sizeId: req.body.sizeId,     
                colorId: req.body.colorId,          
                visibilityId: req.body.visibilityId,
                home: req.body.home,
                extended_description: req.body.extended_description,
            });
            // let imagesCreated = await Image.create (
            //     {
            //     name: req.file.filename,
            //     productId: productCreated.id
                
            // })
             
            // console.log(imagesCreated);
            // return res.redirect('/product');
            // agrega las imagenes
            let product = req.body;
            let imagesForProduct = [];                                

            product.image1 = req.files['image1'] ? req.files['image1'][0].filename : '';
            imagesForProduct.push({ name: req.body.image1 });            
            product.image2 = req.files['image2'] ? req.files['image2'][0].filename : '';
            imagesForProduct.push({ name: req.body.image2 });
            product.image3 = req.files['image3'] ? req.files['image3'][0].filename : '';
            imagesForProduct.push({ name: req.body.image3 });
            product.image4 = req.files['image4'] ? req.files['image4'][0].filename : '';
            imagesForProduct.push({ name: req.body.image4 });
            product.image5 = req.files['image5'] ? req.files['image5'][0].filename : '';
            imagesForProduct.push({ name: req.body.image5 });

            await imagesController.bulkCreate(productCreated.id, imagesForProduct)

            res.redirect('/product');
//hasta aca try
        } catch (error) {
            res.send(error)
        }
    },
    

    edit: (req, res) =>{
        console.log('entre en Edit product')
        console.log('----------------------------')
        console.log(req.params.id);
    
        let productId = req.params.id;
        let promProducts = Product.findByPk(productId, {
            include : ['images','category','brand', 'color', 'size', 'visibility', ]
          });
        let promCategories = Category.findAll();
        let promBrands = Brand.findAll();
        let promColors = Color.findAll();
        let promSizes = Size.findAll();
        let promVisibilities = Visibility.findAll();
        let promImage = Image.findAll();
        
        Promise
        .all([promProducts, promCategories, promBrands, promColors, promSizes, promVisibilities, promImage ])
        .then(([product, allCategories, allBrands, allColors, allSizes, allVisibilities, images]) => {
            //res.json(product, allCategories, allBrands, allColors, allSizes, allVisibilities, productImages)
            return res.render(path.resolve(__dirname, '..', 'views',  'products/productEdit'), {product, allCategories, allBrands, allColors, allSizes, allVisibilities, images})
          })
        .catch(error => res.send(error))
    },

    update: async (req, res) =>{
        try {
        //let product = req.body;
        // console.log(' soy la nueva: ' + req.body.image1)
        // console.log('soy la vieja '+ req.body.oldImag1)
        // product.image1 = req.file ? req.file.filename : req.body.oldImage1;
        // if (req.file===undefined) {
        //     product.image1 = req.body.oldImage1
        // }
        
        // else {
        //     // Actualizaron la foto, saco su nombre del proceso
        //     product.image = req.file.filename

        // }
        // console.log('.......MOSTRAR LA IMAGEN1.......')
        // console.log(product.image1)
        // console.log(product)  
        // delete product.oldImage1

        let productId = req.params.id;
        const productUpdate = await Product.update(
                {
                name: req.body.name,
                stock: req.body.stock,
                stock_min: req.body.stock_min,
                stock_max: req.body.stock_max,
                description: req.body.description,
                price: req.body.price,
                brandId: req.body.brandId,
                categoryId: req.body.categoryId,
                sizeId: req.body.sizeId,     
                colorId: req.body.colorId,          
                visibilityId: req.body.visibilityId,
                home: req.body.home,
                extended_description: req.body.extended_description
                },
                {
                    where: {id: productId}
                }
            );
            console.log('------------------muestra datos del req.body');
            console.log(productUpdate);

            // let productImages = await Image.update({
            //     name: product.image
                
            // },

            //     {where: {productId: productId}});

            // console.log('------------------muestra datos del la imagen');
            // console.log(productImages);
            
            let imagesForProduct = [];                           

            if (req.files.image1) imagesForProduct.push({name: req.files.image1[0].filename, image_num:1})
            if (req.files.image2) imagesForProduct.push({name: req.files.image2[0].filename, image_num:2})
            if (req.files.image3) imagesForProduct.push({name: req.files.image3[0].filename, image_num:3})
            if (req.files.image4) imagesForProduct.push({name: req.files.image4[0].filename, image_num:4})
            if (req.files.image5) imagesForProduct.push({name: req.files.image5[0].filename, image_num:5})
            
            await imagesController.bulkEdit(productId, imagesForProduct)
            
            return res.redirect('/product');
        
                     
        } catch (error) {
            res.send(error)
        }
    },

    delete: (req,res) => {
        let productId = req.params.id;
        Product
        .findByPk(productId)
        .then(product => {
        return res.render(path.resolve(__dirname, '..', 'views',  'products/productDelete'), {product})})
        .catch(error => res.send(error))
    },

    destroy: async function (req, res) { 
         let productId = req.params.id;
        Product.findByPk(productId,
            {
                include : ['images']
            });
        await Image.destroy({ where: { productId: productId }, force: true });
        await Product.destroy({ where: { id: productId }, force: true });
        return res.redirect('/product')
        .catch(error => res.send(error)) 
    },

    // END CRUD
    cart: (req, res) => {
        res.render('products/productCart');
    },


}

module.exports = productController;