from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    # @task()
    # def hello_world(self):
    #     self.client.get("/hello")
    #     self.client.get("/world")

    @task()
    def getPosts(self):
        self.client.get("/Posts")

    

# class SendForumPost(HttpUser):
#     @task()
#     def sendPost(self):

