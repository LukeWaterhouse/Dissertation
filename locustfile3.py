from locust import HttpUser, between, task


#Endpoints for server 3 (running on port 49153)
#8092
# http://172.16.1.247:49153

class HelloWorldUser(HttpUser):

    @task()
    def getProfile(self):
        self.client.get("/ProfileInfo?username=Luke")


    wait_time = between(1,5)