//For Super-user

// Adding a route to add a Employee super-user
// router.post('/addEmployee', auth, restric, async (req,res) => {
//     const newEmployee = new Employee(req.body)
//     newEmployee.save()
//     .then(() => res.json('Employee Added'))
//     .catch(err => res.status(400).json('Unable to add Employee' + err));
// });

// Adding route to search by ID
// router.get('/:id', auth, restrict, (req,res) =>{
//     Employee.findById(req.params.id)
//     .then(employee => res.json(employee))
//     .catch(err => res.status(404).json('Invalid Id ' + err));
// });

// Adding route to delete by id
// router.delete('/delete/:id', auth, restrict, (req,res) => {
//     try{
//         Employee.findByIdAndDelete(req.params.id)
//         .then(employee =>{
//             if(!employee){
//                 res.status(404).json('Invalid Id!')
//             }
//             res.json('Employee Deleted!')
//         })
//     }
//     catch(e){
//         res.status(500).json('Something went wrong!'+err)
//     }
// });