
export function fetchAPI<T>(api:string, endpoint:string) {

        return fetch(`${api}/${endpoint}`)
        .then(response => {
            if(!response.ok) {
                return []
            }
            return response.json()
        })
        .then(datas => datas as T)

}
