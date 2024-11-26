import { baseApi } from "../BaseUrl";

const faqApi = baseApi.injectEndpoints({
    // get all faq
    endpoints: (builder) => ({
        //get all faq
        getAllFaq: builder.query({
            query: () => ({
                url: `rules/get-faqs`,
                method: "GET",
            }),
            providesTags: ['faq']
        }),
        // add faq
        addFaq: builder.mutation({
            query: (data) => {
                return {
                    url: 'rules/add-faqs',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['faq']
        }),
        // delete faq
        deleteFaq: builder.mutation({
            query: (id) => {
                return {
                    url: `rules/delete-faqs/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['faq']
        })
    }),
})
export const {
    // get all faq
    useGetAllFaqQuery,
    // add faq
    useAddFaqMutation,
    // delete faq
    useDeleteFaqMutation
} = faqApi