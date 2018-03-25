import uuid


class PDFHelper:

    def __init__(self):
        self.file = 'web-spyder-report-{}.pdf'.format(str(uuid.uuid4()))
    
    def generate_pdf(self, directory, charts, data):
        pass
