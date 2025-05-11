import Category from '../category/category.model.js';

export const categorySeeder = async() =>{
    try{

        const category = await Category.findOne({name: "Default"});

        if(!category){
            await Category.create({
                name: "Default",
                description: "Default category",
            })
            console.log("Category Default is created succefully")
        }else{
            console.log("Category Default is already created")
        }
        
    }catch (error){
        console.log(`Error at create category : ${error}`);
    }
}