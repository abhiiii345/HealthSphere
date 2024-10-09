// Function to catch errors from asynchronous route handlers
export const catchAsyncErrors = (theFunction) => {
    // Return a new function that will wrap the provided asynchronous function
    return (req, res, next) => {
        // Execute the asynchronous function and handle any errors that occur
        // If `theFunction` returns a promise that is rejected, the error is passed to the `next` middleware
        Promise.resolve(theFunction(req, res, next)).catch(next);
    };
};
