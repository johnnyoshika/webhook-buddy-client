import { useMutation } from '@apollo/client';
import { DELETE_WEBHOOKS, GET_WEBHOOKS } from 'schema/queries';
import { toast } from 'react-toastify';
import {
  DeleteWebhooks,
  DeleteWebhooksVariables,
} from 'schema/types/DeleteWebhooks';
import { GetWebhooks } from 'schema/types/GetWebhooks';

const useDeleteWebhooks = (endpointId: string) => {
  const [mutate] = useMutation<
    DeleteWebhooks,
    DeleteWebhooksVariables
  >(DELETE_WEBHOOKS, {
    onError: error => toast.error(error.message), // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  const deleteWebhooks = (ids: string[]) => {
    mutate({
      variables: {
        input: {
          endpointId,
          webhookIds: ids,
        },
      },
      update: cache => {
        const data = cache.readQuery<GetWebhooks>({
          query: GET_WEBHOOKS,
          variables: {
            endpointId,
          },
        });

        cache.writeQuery({
          query: GET_WEBHOOKS,
          variables: {
            endpointId,
          },
          data: {
            ...data,
            webhooks: {
              ...data?.webhooks,
              nodes: data?.webhooks.nodes.filter(
                n => !ids.includes(n.id),
              ),
            },
          },
        });
      },
      optimisticResponse: {
        deleteWebhooks: {
          __typename: 'DeleteWebhooksPayload',
          affectedRows: ids.length,
        },
      },
    });
  };

  return {
    deleteWebhooks,
  };
};

export default useDeleteWebhooks;
