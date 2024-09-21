var express = require('express');
var router = express.Router();
const multer = require('multer');
const UserProfile = require('../models/fileUpload');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET route to show the form
router.get('/create_profile', (req, res) => {
    res.render('fileUpload');
  });


router.post('/create_profile', upload.single('display_picture'), (req, res) => {
  const { fname, lname, technologies, email } = req.body;
  const display_picture = req.file.buffer.toString('base64');


  // Create the user profile
  const userPr = new UserProfile({
    fname,
    lname,
    technologies,
    email,
    display_picture
  });


  // Save the user profile and handle success or error
  userPr.save()
    .then(() => {
      res.status(200).send('File uploaded successfully');
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/view_profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userProfile = await UserProfile.findById(userId);

    if (!userProfile) {
      return res.status(404).send('User profile not found');
    }

    // // Convert base64 encoded image to binary buffer
    // const displayPictureBuffer = Buffer.from(userProfile.display_picture, 'base64');

    res.render('viewProfile', {
      userProfile,
      // displayPictureBuffer,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/allUsers',async (req,res) => {
  try {
    const users = await UserProfile.find({})

    if (!users) {
      return res.status(404).send('No Users found');
    }

    res.render('allUsers',{users:users})
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
})


module.exports = router; 