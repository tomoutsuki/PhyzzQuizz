const backend_url = 'http://localhost:3333'

function route(path) {
  return `${backend_url}/${path}`
}

/**
 *  Question API interaction layer
 *  by Pastega
 */
export class Question {

  /**
  *  @typedef {{
  *      id: string,
  *      difficulty: number,
  *      content: string, 
  *      preview: string,
  *      choices: string,
  *      answer: string,
  *  }} Question
  */

  /**
   * 
   * @param {String} id Question uuid
   * @returns {Question} 
   */
  static async get(id) {
    const request_info = {
      method: 'GET'
    }
    const response = await fetch(route(`question/${id}`), request_info)
    return await response.text()
  }

  /**
   * @returns {Questions[]}
   */
  static async getAll() {
    const request_info = {
      method: 'GET'
    }
    const response = await fetch(route('question'), request_info)
    return await response.text()
  }

  /**
   * 
   * @param {String} id Question uuid
   */
  static delete(id) {
    const request_info = {
      method: 'DELETE'
    }
    fetch(route(`question/${id}`), request_info)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }

}
