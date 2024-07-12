/**
 * this class is designed to manage async operations in a sequential manner
 * 
 * 1. Queue Class and Properties:
 *     The class manages a list of asynchronous tasks (promises) in an array called queue
 *     and tracks if a task is currently running using pendingPromise.
 * 2. Enqueue Method: This method adds a new asynchronous task to the queue
 *     and starts processing the queue if it’s not already processing.
 * 3. Dequeue Method: This method runs the tasks one by one in the order they were added:
 * 
 * If a task is already running, it does nothing.
 * If no task is running, it takes the next task from the queue and runs it.
 * When the task finishes, it marks the task as done and runs the next task in the queue.
 */

export class Queue {
  private queue: {
    promise: () => Promise<any>;
    reject: any;
    resolve: any;
  }[] = [];
  //boolean flag pendingPromise indicates whether a promise is currently being processed
  private pendingPromise = false;

  /**
   * this method return a new promise and
   * pushes an object containing the 'promise', 'resolve' and 'reject' methods into the 'queue'
   * then calls the 'dequeue' method to start processing the queue if it's not already processing
   * @param promise 
   * @returns 
   */
  public enqueue<T>(promise: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ promise, resolve, reject });
      this.dequeue();
    });
  }

  /**
   * it first checks if a promise is currently being processed(pendingPromise)
   * if so, it returns 'false'
   * it shifts the first item off the 'queue' and starts processing it
   * it sets 'pendingPromise' to 'true' and calls the 'promise' function
   * if the promise resolves, it calls the 'resolve' method, sets 'pendingPromise' to 'false'
   * and calls 'dequeue' again to process the next item in the queue
   * if the promise rejects, it calls the 'reject' method, sets 'pendingPromise' to 'false'
   * and calls 'dequeue' again
   * if there's an error in calling the 'promise' function, it catches the error
   * calls the 'reject' method, and continues processing the queue
   * @returns 
   */
  public dequeue() {
    if (this.pendingPromise) { return false; }

    const item = this.queue.shift();
    if (!item) { return false; }

    try {
      this.pendingPromise = true;
      item.promise().then((value) => {
        this.pendingPromise = false;
        item.resolve(value);
        this.dequeue();
      }).catch((err) => {
        this.pendingPromise = false;
        item.reject(err);
        this.dequeue();
      });
    } catch (err) {
      this.pendingPromise = false;
      item.reject(err);
      this.dequeue();
    }
    return true;
  }
}