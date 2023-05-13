class FileMiddlewares {
    
   checkImageUpload = (extensions,mimetypes,fileName) => {
        return (req,res,next) => { 
            if(req.files) {

            const file = req.files[fileName]
            const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
            const allowedExtensions = extensions
            const allowedMimeTypes = mimetypes
            const allowedFileSize = 2 
            
            
            if(!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.mimetype)) {
                req.flash('error', 'Extensions like these is not allowed! Please use image extensions!')
                return res.status(400).redirect('/register')
            } 
            
            if((file.size / (1024*1024) > allowedFileSize)) {
                req.flash('error', 'File too large!')
                return res.status(400).redirect('/register')
            }

            next()
           } else {
                req.flash('error', 'Please upload an image!')
                return res.status(400).redirect('/register')
                 
           }
        }
    }
}

const fileMiddlewares = new FileMiddlewares()

export default fileMiddlewares