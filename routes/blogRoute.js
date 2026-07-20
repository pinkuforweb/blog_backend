const blog = require("express").Router()
const adminC = require("../controller/adminController")
const userC = require("../controller/userController")
const auth = require("../middleware/auth")
const uploads = require("../middleware/multer")


blog.post("/login",adminC.adminLogin)
blog.post("/create-blog",uploads.single("image"),auth,adminC.adminCreateBlog)
blog.get("/get-allBlogs",adminC.adminAllBlogData)
blog.delete("/blogdelete/:abc",adminC.adminBlogDelete)
blog.get("/blog-edit/:abc",adminC.adminBlogEditData)
blog.put("/blog-update/:abc",adminC.adminBlogUpdate)
blog.get("/user-blog-data",userC.userBlogData)
blog.get("/blog-details-page/:abc",userC.userBlogDetails)
blog.post("/comment-add",userC.userComment)
blog.get("/admin-comments",adminC.adminComments)
blog.delete("/comment-delete/:abc",adminC.adminCommentDelete)
blog.put("/comment-approve/:abc",adminC.adminCommentApproved)
blog.get("/user-comments",userC.AllUserComments)



module.exports = blog