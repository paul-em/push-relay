package main

import(
    "fmt"
    "net/http"
    "strconv"
)

func serveRest(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        url := "http://localhost:3001"
        req, err := http.NewRequest("POST", url, nil)
        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()
        fmt.Fprintf(w, strconv.Itoa(resp.StatusCode))
    } else {
        w.WriteHeader(http.StatusNotFound)
        fmt.Fprintf(w, "Not implemented")
    }
}

func main() {
    http.HandleFunc("/", serveRest)
    http.ListenAndServe("localhost:3000", nil)
}
