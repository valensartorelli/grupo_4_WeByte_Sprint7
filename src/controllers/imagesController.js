const db = require('../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const {Image} = require('../database/models');

//Aqui tienen otra forma de llamar a cada uno de los modelos


const imagesController = {

    // Función para crear en masa
    bulkCreate: async (id, images) => {
    try{
        // Agrego a cada una de las imagenes el ID de producto.
        images.forEach(image => image.productId = id);
    
        // Rafaga de Creates.
        return await Image.bulkCreate(images);
    } catch (error) {
        res.send(error)
    }
    },

    detail: async (productId) => {
        try{
        let imagenes = await Image.findAll(
            {
                where: {productId: productId}
            },
            {
                order: [['id', 'ASC']]
            }
            );

        return imagenes;
    } catch (error) {
        res.send(error)
    }
    },
    
    update: async (imageId, imageName) => {
        try{
        let image = await Image.update({
            name: imageName
            },{
            where: {id: imageId}
        });

        return image;
    } catch (error) {
        res.send(error)
    }
    },


    bulkEdit: async (productId, images) => {
        try{
            let imagesForProduct=[];
            let numImg = 0;
            let imagesOld = await imagesController.detail(productId);
    
            images.forEach(image => {
                numImg = image.image_num - 1;
                imagesForProduct.push(imagesController.update(imagesOld[numImg].id, image.name));
            });
    
            return imagesForProduct;
        } catch (error) {
            res.send(error)
        }
    }
};


module.exports = imagesController;