const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const fileUpload = require("express-fileupload");


const jwt = require("jsonwebtoken");



const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");


const schema = new passwordValidator();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(__dirname + "/images"));
app.use(fileUpload());

const port = 4000;



//-------------------------------------------------USER TOKEN / SESSION---------------------------------------------------------------------------------
//-------------------------------------------------USER TOKEN / SESSION---------------------------------------------------------------------------------
//-------------------------------------------------USER TOKEN / SESSION---------------------------------------------------------------------------------



//-------------------------------------------------VERIFY THAT USER HAS A TOKEN---------------------------------------------------------------------------------

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            res.send({ error: "Your session has expired or does not exist." });
            return;
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};



//-------------------------------------------------USER TOKEN / SESSION---------------------------------------------------------------------------------



//-------------------post REQUESTS-----------------------------------------------------------------------------------
//-------------------post REQUESTS-----------------------------------------------------------------------------------
//-------------------post REQUESTS-----------------------------------------------------------------------------------

app.get("/get-posts", async (req, res) => {

    const posts = await prisma.post.findMany();

    res.send(posts);
});

app.get("/get-post/:postId", async (req, res) => {
    const postId = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({
        where: { id: postId }
    });
    res.send(post);
});



//--------------------------------------------DELETE post----------------------------------------------------------





//--------------------------------------------ADD NEW post----------------------------------------------------------

app.post("/create-post", verifyToken, async (req, res) => {
    const postData = req.body;
    const userId = req.userId;

    if (!postData.title || !postData.description || !postData.imageUrl) {
        res.send({error: "You've left empty fields."});
        return;
    }

    const user = await prisma.user.findUnique({
        where: { id:userId },
    });

    const post = await prisma.post.create({
        data: { 
            title: postData.title,
            description: postData.description,
            imageUrl: postData.imageUrl,
            userId: userId,
            userName: user.userName
        }
    });
    res.send({success: "Added " + post.title + " succesfully!"})
});


app.delete("/delete-post", verifyToken, async (req, res) => {
    const userId = req.userId;
    const postId = req.body.postId;

    const post = await prisma.post.findUnique({
        where: { id: postId }
    });

    if (!post) {
        res.status(404).send({ error: "Post not found." });
        return;
    }

    if (post.userId !== userId) {
        res.status(403).send({ error: "You do not have permission to delete this post." });
        return;
    }

    try {
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        });
        res.send({ success: "Post with id: " + postId + " has been deleted." });
    } catch (error) {
        res.send({ error: "Something went wrong, could not delete post." });
        return;
    }
});



//--------------------------------------------UPDATE post INFORMATION----------------------------------------------------------

app.patch("/update-post/:postId", async (req, res) => {
    const postId = parseInt(req.params.postId);
    const postData = req.body;

    const updatedpost = await prisma.post.update({
        where: { id: postId},
        data: {
            name: postData.name || undefined,
            description: postData.description || undefined,
            imageUrl: postData.imageUrl || undefined
        }
    });
    res.send({success: "Updated: " + updatedpost.name });
});


//--------------------------------------------REGISTER----------------------------------------------------------
//--------------------------------------------REGISTER----------------------------------------------------------
//--------------------------------------------REGISTER----------------------------------------------------------


app.post("/register", async (req, res) => {
    const registerData = req.body;

//-------------------------------------------------USER INPUT VALIDATION---------------------------------------------------------------------------------


    if (!registerData.firstName || !registerData.lastName || !registerData.userName || !registerData.email || !registerData.password) {
        res.send({error: "You've left empty fields."});
        return;
    }

    if (registerData.firstName.length < 3) {
        res.send({ error: "Your first name  needs to be a minimum of 3 characters." }); //first name need to be atleast 3 characters
        return;
    }
    if (registerData.lastName.length < 3) {
        res.send({ error: "Your last name needs to be a minimum of 3 characters." }); //last name need to be atleast 3 characters
        return;
    }
    if (registerData.userName.length < 3) {
        res.send({ error: "Your username needs to be a minimum of 3 characters." }); //username need to be atleast 3 characters
        return;
    }
    
    

//-------------------------------------------------EMAIL VALIDATION---------------------------------------------------------------------------------

    const emailValid = emailValidator.validate(registerData.email); //check if email is valid

    if (!emailValid) {
        res.send({ error: "The email you submitted is not valid." }); 
        return;
    }

    const emailExists = await prisma.user.findUnique({ // checking if email already exists
        where: { email: registerData.email }
    });

    if (emailExists) {
        res.send({ error: "An account with this email already exists." });  
        return;
        
    }

//-------------------------------------------------PASSWORD VALIDATION---------------------------------------------------------------------------------

    schema 
        .is().min(8)           //password requirements
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().not().spaces()
        .is().not().oneOf([
            "password","password123"
        ]);
    
    const passwordValid = schema.validate(registerData.password);

    if (!passwordValid) {
        res.send({ error: "Your password is not safe, please include atleast 8 letters, lower and uppercase letters, no spaces and atleast 2 digits."});
        return;
    }

//-------------------------------------------------TRY AND CATCH ERRORS---------------------------------------------------------------------------------

    try {
        const hashedPassword = bcrypt.hashSync(registerData.password, 10); //encrypted password
        
        const user = await prisma.user.create({
            data: {
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                userName: registerData.userName,
                email: registerData.email,
                password: hashedPassword,
                personalData: {
                    create: {
                        profileImageUrl: registerData.profileImageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }

                }
            }
        });
        res.send({ success: "Hello " + user.userName + " your account has been created!" }); 
    } catch (error) {
        console.log(error);
        res.send({error: "Something went wrong. Please try again later."});
        return;
    }
});


//-------------------------------------------------LOGIN---------------------------------------------------------------------------------

app.post("/login", async (req, res) => {
    const loginData = req.body;

    if (!loginData.userName || !loginData.email || !loginData.password) {
        res.send({ error: "You've left empty fields."});
        return;
    }

    const user = await prisma.user.findUnique({
        where: { email: loginData.email, userName: loginData.userName }
    });
    if (!user) {
        res.send({ error: "Login credentials dont match." });
        return;
    };

    const passwordValid = await bcrypt.compare(loginData.password, user.password);

    if (!passwordValid) {
        res.send({ error: "Password is incorrect."});
        return;
    }
    
    // SEND TOKEN TO USER WHEN LOGGING IN
    res.send({
        token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "5h" }),
        user 
    });
});


//-------------------------------------------------DELETE A USER---------------------------------------------------------------------------------

app.delete("/delete-user", verifyToken, async (req, res) => {
    const userId = req.userId;
   try {
    const deletedUser = await prisma.user.delete({
        where: { id: userId }
    });    
    res.send({success: "Account with username: " + deletedUser.userName + " has been deleted."});
   } catch (error) {
    res.send({ error: "Something went wrong, could not delete user."});
    return;
   }
});

app.patch("/delete-profileimageurl", verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        // Find the personalData record associated with the userId
        const personalData = await prisma.personalData.findFirst({
            where: {
                userId: userId
            }
        });

        if (personalData) {
            // If personalData exists, update it to delete the profileImageUrl
            const updatedPersonalData = await prisma.personalData.update({
                where: {
                    id: personalData.id
                },
                data: {
                    profileImageUrl: null // Set profileImageUrl to null to delete it
                }
            });

            res.json({ success: true, message: "Profile image URL deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Personal data not found for the user" });
        }
    } catch (error) {
        console.error("Error deleting profile image URL:", error);
        res.status(500).json({ success: false, message: "Failed to delete profile image URL" });
    }
});


//-------------------------------------------------LIST OF ALL EXISTING USERS---------------------------------------------------------------------------------

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
});



//-------------------------------------------------UPDATE USER INFORMATION---------------------------------------------------------------------------------




//-------------------------------------------------UPDATE USER PROFILE INFORMATION---------------------------------------------------------------------------------



app.patch("/update-current-user", verifyToken, async (req, res) => {
    const userId = req.userId;
    const updatedUserProfile = req.body;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { personalData: true },
    });

    if (!user) {
        res.send({ error: "User not found."});
        return;
    }

    const emailExists = await prisma.user.findUnique({ // checking if email already exists
        where: { email: updatedUserProfile.email }
    });

    if (emailExists) {
        res.send({ error: "An account with this email already exists." });  
        return;
    }

    const userNameExists = await prisma.user.findUnique({ // checking if email already exists
        where: { userName: updatedUserProfile.userName }
    });

    if (userNameExists) {
        res.send({ error: "An account with this username already exists." });  
        return;
    }
        
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName: updatedUserProfile.firstName || undefined,
                lastName: updatedUserProfile.lastName || undefined,
                userName: updatedUserProfile.userName || undefined,
                email: updatedUserProfile.email || undefined,
            }
        });


        if (user.personalData.length > 0) {
            const personalDataId = user.personalData[0].id;
            await prisma.personalData.update({
                where: { id: personalDataId },
                data: {
                    profileImageUrl: updatedUserProfile.profileImageUrl || undefined,
                },
            });
        }
        delete user.password;
        res.send({ success: "Profile has been updated successfully.", user:updatedUser});
    } catch (error) {
        console.log(error);
        res.send({error: "Something went wrong. Please try again later."});
        return;
    }
    
});



app.post('/setup-user-profile', verifyToken, async (req, res) => {

    const userId = req.userId;
    const setupData = req.body;

    if (!setupData.profileImageUrl) {
        res.send({ error: "You must submit a profile image URL." });
        return;
    }


    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        res.send({ error: "User not found." });
        return;
    }

    const profileInformation = await prisma.personalData.create({
        data: {
            profileImageUrl: setupData.profileImageUrl,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    res.send({ success: "Secret sauce has been added successfully." });

});

app.get("/get-current-user", verifyToken, async (req, res) => {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
        where: { id:userId },
        include: { personalData: true , posts: true }
    });

    if (!user) {
        res.send({ error: "User not found."});
    }
    delete user.password;
    res.send({ user: user});
});

app.get("/get-user-info", verifyToken, async (req, res) => {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
        where: { id:userId }
    });

    if (!user) {
        res.send({ error: "User not found."});
    }

    const personalData = await prisma.personalData.findMany({
        where: { userId: user.id }
    });
    res.send({ personalData: personalData});


});

app.post("/api/upload-picture",  async (req, res) => {
    if (req.files === null) {
        res.send({ error: "No file uploaded." });
    }
    
    const file = req.files.file;
    file.mv(`${__dirname}/images/${file.name}`, async (error) => {
        if (error) {
            res.send({ error });
            return;
        }

        await prisma.dropImage.create({
            data: {
                fileName: file.name,
                filePath: "/images/" + file.name,
            }
        });

        res.send({ success: "File uploaded successfully." });
    });
});

app.get("/api/get-pictures", async (req, res) => {
    const pictures = await prisma.dropImage.findMany();
    res.send(pictures);
});


app.listen(port, () => {
    console.log("Server is running on port: ", port)
});
