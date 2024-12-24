import { baseApi } from "../BaseUrl";

const eventApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: Create a new event
        createEvent: builder.mutation({
            query: (data) => ({
                url: "events/admin-create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['event']
        }),

        // PATCH: Update an event by ID
        updateEvents: builder.mutation({
            query: ({ id, data }) => ({
                url: `/events/update/${id}`, // Dynamically add the event ID
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['event']
        }),
        getAllEvent: builder.query({
            query: ({ searchTerm, page }) => ({
                url: `events/admin`,
                method: 'GET',
                params: { searchTerm, page }
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
            query: ({ id, data }) => ({
                url: `events/featured/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['event']
        }),
    })
})
export const {
    useUpdateEventsMutation,
    useCreateEventMutation,
    useGetAllEventQuery,
    useAcceptEventMutation,
    useDeclineEventRequestMutation,
    useDeleteEventRequestMutation,
    useUpdateEventMutation
} = eventApis