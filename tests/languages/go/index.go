package main

import(
    "fmt"
    "net/http"
)

func serveRest(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        url := "http://localhost:4000"
        req, err := http.NewRequest("POST", url, nil)
        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()
        if resp.StatusCode != 200 {
            w.WriteHeader(http.StatusServiceUnavailable)
            fmt.Fprintf(w, "Service unavailable")
        } else {
            w.WriteHeader(http.StatusOK)
            fmt.Fprintf(w, "OK")
        }

    } else {
        w.WriteHeader(http.StatusNotImplemented)
        fmt.Fprintf(w, "Not implemented")
    }
}

func main() {
    http.HandleFunc("/", serveRest)
    http.ListenAndServe("localhost:3000", nil)
}
