const server = require('./api/server');
// START YOUR SERVER HERE


const port = 5000;
server.listen(port, () => {
    console.log(`server is running at port ${port}`);
})
