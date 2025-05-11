import Category from "../category/category.model.js"
import Publication from "../publication/publication.model.js"

export const registerCategory = async(req,res) => {
    try {
        const data = req.body;
        const category = await Category.create(data);

        return res.status(201).json({
            message: "La categoría ha sido registrada",
            name: category.name
        });
    } catch(error) {
        return res.status(500).json({
            message: "El registro de la categoría ha fallado",
            error: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params;

        const category = await Category.findById(uid);

        if (!category) {
            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }

        await Category.findByIdAndUpdate(uid, { status: false }, { new: true });

        const categoryDefault = await Category.findOne({ name: "Default" });

        if (!categoryDefault) {
            return res.status(404).json({
                message: "Categoría por defecto no encontrada"
            });
        }

        await Publication.updateMany({ category: uid },{ category: categoryDefault._id },{ new: true });

        return res.status(200).json({
            message: "Categoría deshabilitada y publicaciones actualizadas"
        });

    } catch (error) {
        return res.status(500).json({
            message: "La eliminación de la categoría ha fallado",
            error: error.message
        });
    }
};



export const updateCategory = async(req,res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const category = await Category.findById(uid);

        if(!category) {
            return res.status(404).json({
                message: "La categoría no existe",
                error: error.message
            }); 
        }

        const updatedCategory = await Category.findByIdAndUpdate(uid, data, { new: true });
        
        return res.status(200).json({ 
            message: "Categoría actualizada",
            updatedCategory
        });

    } catch(error) {
        return res.status(500).json({
            message: "La actualización de la categoría ha fallado",
            error: error.message
        });
    }
};

export const getCategory = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, category ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            category
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: e.message
        })
    }
}