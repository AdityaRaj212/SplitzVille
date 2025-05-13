import express from 'express';
import GroupController from '../controllers/group.controller.js';

const router = express.Router();
const groupController = new GroupController();

router.post('/create-group', (req, res)=>{
    groupController.createGroup(req, res);
});

router.get('/:groupId', (req, res)=>{
    groupController.getGroup(req, res);
});

router.get('/user/:userId', (req, res)=>{
    groupController.getGroupsByUserId(req, res);
});

router.put('/update-group', (req, res)=>{
    groupController.updateGroup(req, res);
});
router.delete('/delete-group/:groupId', (req, res)=>{
    groupController.deleteGroup(req, res);
    });

router.get('/all-groups', (req, res)=>{
    groupController.getAllGroups(req, res);
});

router.post('/add-member/:groupId', (req, res)=>{
    groupController.addMember(req ,res);
});

router.delete('/remove-member', (req, res)=>{
    groupController.removeMember(req, res);
});

router.get('/all-group-members', (req, res)=>{
    groupController.getAllGroupMembers(req, res);
});



export default router;