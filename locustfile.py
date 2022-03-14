from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    # @task()
    # def hello_world(self):
    #     self.client.get("/hello")
    #     self.client.get("/world")

    @task()
    def getPosts(self):
        self.client.get("/Posts")

    @task()
    def putPost(self):
        self.client.post("/Posts", json={"userName":"Locust", "date":"12/03/2022", "content":"locust test" })

    # @task()
    # def getPosts(self):
    #     self.client.get("/Posts")

    # @task()
    # def getPosts(self):
    #     self.client.get("/Posts")



    

# class SendForumPost(HttpUser):
#     @task()
#     def sendPost(self):

