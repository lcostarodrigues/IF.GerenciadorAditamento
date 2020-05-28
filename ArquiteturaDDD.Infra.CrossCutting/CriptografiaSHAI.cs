using System.Security.Cryptography;
using System.Text;

namespace ArquiteturaDDD.Infra.CrossCutting
{
    public class CriptografiaSHAI
    {

        private static byte[] GetHash(string texto)
        {
            HashAlgorithm algorithm = SHA1.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(texto));
        }

        public static string Criptografar(string texto)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(texto))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}
