from locust import HttpUser, task


#Endpoints for server 2 (running on port 49152)
#8091
# 

class HelloWorldUser(HttpUser):

    # @task()
    # def getPosts(self):
    #     self.client.get("/Posts")

    @task()
    def putPost(self):
        self.client.post("/Posts", json={"userName":"Luke", "date":"12/03/2022", "content":"locust test" })

