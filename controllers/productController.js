import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';
export const createProductController = async(req,res) =>{
    try{
        const {name,description,slug,price,category,quantity,shipping} = req.fields
        const{ photo }=req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:' description is required'})
            case !price:
                return res.status(500).send({error:'price is required'})  
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})  
            case photo && photo.size >1000000:
                return res
                .status(500)
                .send({error:'Photo is required and should be less then 1mb'});
           
        }
        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
           
        }
        await products.save()
        res.status(300).send({
            success:true,
            message:'product created successfully',
            products,
        })
    }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:'error in creating product'
        });
    }
};

//get all products
export const getProductController = async(req,res) =>{
    try{
        const products =await productModel.find({}).populate('category').select("-photo").limit(10).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            total:products.length,
            message:" products ",
            products,
            
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in geting photo',
            error:error.message
        })
    }
};

//get single product
export const  getsingleProductController =async (req,res) => {
    try{
        
        const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            message:'get single product successfully',
            product,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while getting single product'
        })
    }
};

export const productPhotoController=async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting photo',
            error,
        })
    }
};

//delete category
export const deleteProductController = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'product deleted'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            messge:'error while deleting product',
            error
        })
    }
};

//update product
export const updateProductController = async(req,res) =>{
    try{
        const {name,description,slug,price,category,quantity,shipping} = req.fields
        const{ photo }=req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:' description is required'})
            case !price:
                return res.status(500).send({error:'price is required'})  
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})  
            case photo && photo.size >1000000:
                return res
                .status(500)
                .send({error:'Photo is required and should be less then 1mb'});
           
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
           
        }
        await products.save()
        res.status(300).send({
            success:true,
            message:'product updated successfully',
            products,
        })
    }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:'error in update product'
        });
    }
}
