from locust import HttpUser, between, task


# Endpoints for server 2 (running on port 49152)
# 8093
#running 20, 100 btw

class HelloWorldUser(HttpUser):


    @task()
    def getPosts(self):
        self.client.get("/Posts")

    @task()
    def deletePosts(self):
        self.client.delete("/Posts")


    wait_time = between(1,5)



        