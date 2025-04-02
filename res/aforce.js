  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  async function fetchAccessToken(gwUrl) {
    
      uuid = generateUUID();
      const params = new URLSearchParams();
      params.append("op", "token");
      params.append("uuid", `${uuid}`);
    
      try {
          const response = await fetch(gwUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept": "application/json"
              },
              body: params
          });
        
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("Access Token:", data.access_token);
          return data.access_token;
      } catch (error) {
          console.error("Error fetching access token:", error);
      }
  }

  async function startChatSession(gwUrl, accessToken) {
    
      const params = new URLSearchParams();
      params.append("op", "start");
      params.append("token", `${accessToken}`);
      params.append("uuid", `${uuid}`);


      try {
          const response = await fetch(gwUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept": "application/json"
              },
              body: params
          });
        
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("Chat Session ID:", data.sessionId);
          return data;
      } catch (error) {
          console.error("Error starting chat session:", error);
      }
  }

  async function sendChatMessage(gwUrl, accessToken, sessionId, message, sequenceId) {

      const params = new URLSearchParams();
      params.append("op", "send");
      params.append("token", `${accessToken}`);
      params.append("uuid", `${sessionId}`);
      params.append("seqId", `${sequenceId}`);
      params.append("msg", `${message}`);
    
      try {
          const response = await fetch(gwUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept": "application/json"
              },
              body: params
          });
        
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("Chat Response:", data.messages[0].message);
          return data;
      } catch (error) {
          console.error("Error sending chat message:", error);
      }
  }

  async function endChatSession(gwUrl, accessToken, sessionId) {

      const params = new URLSearchParams();
      params.append("op", "end");
      params.append("token", `${accessToken}`);
      params.append("uuid", `${sessionId}`);
    
      try {
          const response = await fetch(gwUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept": "application/json"
              },
              body: params
          });
        
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("Chat Session Ended:", data.messages[0].reason);
          return data.messages[0].reason;
      } catch (error) {
          console.error("Error ending chat session:", error);
      }
  }

  function getTtsUrl() {
      return atob("QUl6YVN5RDlWWVdiODNneXI2R0hCUllYNnpWSGVGQVVmWjlQVlJj");
  }
