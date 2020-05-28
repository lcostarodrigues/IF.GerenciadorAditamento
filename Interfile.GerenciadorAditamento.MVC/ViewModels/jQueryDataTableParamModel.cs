namespace Interfile.GerenciadorAditamento.MVC.ViewModels
{
    public class jQueryDataTableParamModel
    {
        /// Request sequence number sent by DataTable,
        /// same value must be returned in response
        public string sEcho { get; set; }

        /// Text used for filtering
        public string sSearch { get; set; }

        /// Number of records that should be shown in table
        public int iDisplayLength { get; set; }

        /// First record that should be shown(used for paging)
        public int iDisplayStart { get; set; }

        /// Number of columns in table
        public int iColumns { get; set; }

        /// Number of columns that are used in sorting
        public int iSortingCols { get; set; }

        /// First sort column numeric index, possible to have 
        /// _1,_2 etc for multi column sorting
        public int iSortCol_0 { get; set; }

        /// Sort direction of the first sorted column, asc or desc
        public string sSortDir_0 { get; set; }

        /// Comma separated list of column names
        public string sColumns { get; set; }
    }
}