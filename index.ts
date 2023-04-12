import { Handler, Context } from 'aws-lambda';

export const handler: Handler = async (event, context: Context) => {
    return context.logStreamName;
};
