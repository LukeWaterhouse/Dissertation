from locust import HttpUser, between, task

#8090
#Endpoints for server 1 (running on port 5000)
# http://172.16.0.153:5000

class HelloWorldUser(HttpUser):
 
    @task()
    def getPosts(self):
        self.client.get("/")

    wait_time = between(1,5)
