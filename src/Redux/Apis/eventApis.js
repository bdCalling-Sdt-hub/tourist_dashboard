import { baseApi } from "../BaseUrl";

const eventApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvent: builder.query({
            query: ({ searchTerm }) => ({
                url: `events/admin`,
                method: 'GET',
                params: { searchTerm }
            }),
            providesTags: ['event']
        }),
        acceptEvent: builder.mutation({
            query: (id) => ({
                url: `events/approve/${id}`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['event']
        }),
        declineEventRequest: builder.mutation({
            query: ({ id, reason }) => ({
                url: `events/cancel/${id}`,
                method: 'PATCH',
                body: { reason }
            }),
            invalidatesTags: ['event']
        }),
        deleteEventRequest: builder.mutation({
            query: (id) => ({
                url: `events/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['event']
        }),
        updateEvent: builder.mutation({
            query: ({ id, featured }) => ({
                url: `events/update/${id}`,
                method: 'PATCH',
                body: { featured }
            }),
            invalidatesTags: ['event']
        }),
    })
})
export const {
    useGetAllEventQuery,
    useAcceptEventMutation,
    useDeclineEventRequestMutation,
    useDeleteEventRequestMutation,
    useUpdateEventMutation
} = eventApis